import ResetPasswordForm from "@/components/ResetPasswordForm"
import Image from "next/image"


export default function ForgotPassword() {
  
  return (
    <section className="min-h-screen w-full flex flex-col gap-8 lg:flex-row lg:justify-between p-6 xl:px-60 items-center">
      <Image
        src="/logo.png"
        width={400}
        height={100}
        alt="logo"
      />
      <ResetPasswordForm />
    </section>
  )
}
