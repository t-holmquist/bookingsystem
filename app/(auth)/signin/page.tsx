import SignInForm from "@/components/SignInForm"
import Image from "next/image"
import React from "react"

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
        <Image src="/ek_logo.png" width={400} height={100} alt="logo" />
        <SignInForm />
      </div>
    </section>
  )
}

export default SignIn
