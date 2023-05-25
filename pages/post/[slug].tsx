import { GetStaticProps } from "next";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { sanityClient, urlFor } from "../../sanity";
import { Post } from "../../typings";
import PortableText from "react-portable-text";
import { BsTypeH1 } from "react-icons/bs";
import { useForm, SubmitHandler } from "react-hook-form";

interface Props {
  post: Post;
}

// TypeScript Input defn
type Inputs = {
  _id: string;
  name: string;
  email: string;
  comment: string;
  example: string;
};

const Post = ({ post }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("Checking User data ");
    console.log("Here contains the logged data", data);
  };
  // const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <div>
      <Header />
      {/* main Image */}
      <img
        className="w-full h-96 object-cover"
        src={urlFor(post.mainImage).url()!}
        alt="Banner Image"
      />
      {/* <div className='py-20'>WElcome to the page inside clicks</div> */}
      {/* Article Section */}
      <div className="max-w-3xl mx-auto mb-10">
        <article className="w-full mx-auto p-5 bg-secondaryColor/10">
          <h1
            className="font-titleFont font-medium text-[32px]
        text-primary border-b-[1px] border-b-cyan-800 mt-3 mb-3"
          >
            {post.title}
          </h1>
          <h2 className="font-bodyFont text-[18px] text-gray-500 mb-2">
            {post.description}
          </h2>
          <div className="flex items-center gap-2">
            <img
              src={urlFor(post.author.image).url()}
              alt="User Icon"
              className="rounded-full w-12 h-12 object-cover bg-red-400"
            />
            <p className="font-bodyFont text-base">
              Blog post by{" "}
              <span className="font-bold text-secondaryColor">
                {post.author.name}
              </span>
              - Published at {new Date(post.publishedAt).toLocaleDateString()}
            </p>
          </div>
          <div className="mt-10">
            <PortableText
              dataset={process.env.NEXT_PUBLIC_SANITY_DATASET || "production"}
              projectId={
                process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "satmrwfw"
              }
              content={post.body}
              // how we want to see the text is possible from sealizeer
              serializers={{
                h1: (props: any) => {
                  <h1
                    className="text-3xl font-bold my-5 font-titleFont"
                    {...props}
                  />;
                },
                h2: (props: any) => {
                  <h2
                    className="text-2xl font-bold my-5 font-titleFont"
                    {...props}
                  />;
                },
                h3: (props: any) => {
                  <h3
                    className="text-2xl font-bold my-5 font-titleFont"
                    {...props}
                  />;
                },
                li: ({ children }: any) => (
                  <li className="ml-4 list-disc">{children}</li>
                ),
                link: ({ href, children }: any) => {
                  <a href={href} className="text-cyan-500 hover:underline">
                    {children}
                  </a>;
                },
              }}
            />
          </div>
        </article>
        <hr className="max-w-lg my-5 mx-auto border[1px] border-secondaryColor" />
        <div>
          <p className="text-xs text-secondayColor uppercase font-titleFont font-bold">
            How do you Liked this Article?
          </p>
          <h3 className="font-titleFont text-3xl font-bold">
            Leave a Comment Below!
          </h3>
          <hr className="py-3 mt-2" />
          {/* Form Getting Started */}
          {/* using react hook form */}
          {/* Generating Id for hook Form  that can track and fetch other feilds as well */}
          <input
            {...register("_id")}
            type="hidden"
            name="_id"
            value={post._id}
          />
          <form
            onSubmit={handleSubmit(onSubmit)}
            className=" mt-7 flex flex-col gap-6"
          >
            <label className="flex flex-col">
              <span className="font-titleFont font-semibold text-base">
                Name
              </span>
              <input
                {...register("name", { required: true })}
                className="text-base placeholder:text-sm border-b-[1px] border-secondaryColor
                py-1 px-4 outline-none focus-within:shadow-xl shadow-secondaryColor"
                type="text"
                placeholder="Enter Your Name"
              />
            </label>
            <label className="flex flex-col">
              <span className="font-titleFont font-semibold text-base">
                Email
              </span>
              <input
                {...register("email", { required: true })}
                className="text-base placeholder:text-sm border-b-[1px] border-secondaryColor
                py-1 px-4 outline-none focus-within:shadow-xl shadow-secondaryColor"
                type="email"
                placeholder="Enter Your Email"
              />
            </label>
            <label className="flex flex-col">
              <span className="font-titleFont font-semibold text-base">
                Comment
              </span>
              <textarea
                {...register("comment", { required: true })}
                className="text-base placeholder:text-sm border-b-[1px] border-secondaryColor
                py-1 px-4 outline-none focus-within:shadow-xl shadow-secondaryColor"
                placeholder="Enter Your Comments"
                rows={6}
              />
            </label>

            <button
              className="w-full bg-bgColor text-white text-base font-titleFont font-semibold tracking-wider uppercase py-2 rounded-sm
            hover:bg-secondaryColor duration-300"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};
// 1:18
export default Post;

// query to backend sanity
export const getStaticPaths = async () => {
  const query = `
    *[_type == "post"]{
        _id,
          slug{
          current
          }
      }`;

  const posts = await sanityClient.fetch(query);

  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

// working with sanity
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == "post" && slug.current == $slug][0]{
        _id, 
          publishedAt,
          title,
          author -> {
            name,
            image,
          },
          description,
          mainImage,
          slug,
          body
      }`;

  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  });

  if (!post) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      post,
    },
    revalidate: 60,
  };
};
