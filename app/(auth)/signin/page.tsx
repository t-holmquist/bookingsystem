import SignInForm from "@/components/SignInForm"
import Image from "next/image"

const SignIn = () => {
  return (
    <section className="min-h-screen w-full flex flex-col gap-8 md:flex-row sm:justify-between p-6 xl:px-60 items-center">
      <div>
        {/* Mobile image */}
        <div className="block sm:hidden">
          <Image
            width={250}
            height={250}
            src={"/brandinglogo.png"}
            alt="brandinglogo"
          />
        </div>
        <div className="hidden sm:block">
          <Image
            width={400}
            height={400}
            src={"/brandinglogo.png"}
            alt="brandinglogo"
          />
        </div>
      </div>
      <div>
        <Image className="mb-10" src="/logo.png" width={400} height={100} alt="logo" />
        <SignInForm />
      </div>
    </section>
  )
}

export default SignIn



