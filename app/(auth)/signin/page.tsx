import SignInForm from "@/components/SignInForm"
import Image from "next/image"

const SignIn = () => {
  return (
    <section className="h-screen w-full flex justify-between px-60 items-center">
      <div>
        <Image
          width={400}
          height={400}
          src={"/brandinglogo.png"}
          alt="brandinglogo"
        />
      </div>
      <div>
        <Image className="mb-10" src="/logo.png" width={400} height={100} alt="logo" />
        <SignInForm />
      </div>
    </section>
  )
}

export default SignIn
