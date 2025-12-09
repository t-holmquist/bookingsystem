import ResetPasswordForm from "@/components/ResetPasswordForm"
import Image from "next/image"


export default function ForgotPassword() {
  
  return (
    <section className="h-screen w-full flex justify-between px-60 items-center">
      <Image
        className="mb-10"
        src="/logo.png"
        width={400}
        height={100}
        alt="logo"
      />
      <ResetPasswordForm />
    </section>
  )
}
