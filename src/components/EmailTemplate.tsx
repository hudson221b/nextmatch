type VerificationEmailProps =  {
  name: string
  link: string
}



export const VerificationEmailTemplate:React.FC<Readonly<VerificationEmailProps>> = ({name, link}) =>{
  return (
    <div className="font-sans max-w-2xl mx-auto p-6 bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Email Verification
        </h1>
        <p className="text-gray-600 mb-4">Hello {name},</p>
        <p className="text-gray-600 mb-6">
          Thank you for signing up! Please verify your email address by clicking
          the link below:
        </p>
        <a
          href={link}
          className="inline-block px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300 ease-in-out mb-6"
        >
          Verify Email Address
        </a>
        <p className="text-gray-600">
          Best regards,
          <br />
          NextMatch App Team
        </p>
      </div>
    </div>
  )
}
