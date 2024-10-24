import Image from "next/image"
export default function PrivacyPolicy() {
    return (
        <>
            <div className="flex flex-col gap-8" style={{ fontFamily: "VoiganteDisplay" }}>
                <div className="min-h-[70vh] relative">
                    <Image
                        
                        className="absolute top-0 h-full object-cover object-right w-full"
                        style={{ opacity: "1" }}
                        src={"/images/privacy-policy/image 16.svg"}
                        alt="home-banner"
                        width={1000}
                        height={500}
                    />
                    <div className="pt-[16rem] sm:pt-72 md:pt-56 z-[999] relative flex flex-col md:flex-nowrap flex-wrap gap-4 px-8 sm:px-28 pb-16 ">
                        <p>Home <span className="mx-2">/</span> Privacy Policy</p>
                        <h1 className="text-[4rem]">Privacy Policy</h1>
                    </div>
                </div>
                <div className="px-8 sm:px-28 flex flex-col gap-4">
                <p className="text-gray-400 ">We receive, collect and store any information you enter on our
                    website or provide us in any other way. In addition, we collect the Internet protocol (IP) address
                    used to connect your computer to the Internet; login; e-mail address; password; computer and
                    connection information and purchase history (as applicable). We may use software tools to measure
                    and collect session information, including page response times, length of visits to certain pages,
                    page interaction information, and methods used to browse away from the page. We also collect
                    personally identifiable information (including name, email, password, communications); payment
                    details (including credit card information), comments, feedback, product reviews, recommendations,
                    and personal profile. We may also use the association of such data with the visitation information
                    Google Analytics collects from my site.</p>

                <p className="text-gray-400 ">When you conduct a transaction on our website, as part of the
                    process, we collect personal
                    information you give us such as your name, address and email address. Your personal information will
                    be used for the specific reasons stated above only.</p>

                <p className="text-gray-400 ">We collect such Non-personal and Personal Information for the
                    following purposes:</p>
                <ul className="list-disc list-inside">
                    <li>To provide and operate the Services;</li>
                    <li>To provide our Users with ongoing customer assistance and technical support;</li>
                    <li>To be able to contact our Visitors and Users with general or personalized service-related
                        notices and promotional messages;
                    </li>
                    <li>To create aggregated statistical data and other aggregated and/or inferred Non-personal
                        Information, which we or our business partners may use to provide and improve our respective
                        services;
                    </li>
                    <li>To comply with any applicable laws and regulations.</li>
                </ul>

                <p className="text-gray-400 ">
                    Our company is hosted on the
                    <a href="https://aws.amazon.com" target="_blank" rel="noopener noreferrer"
                       className="text-blue-500"> AWS (Amazon Web Services) </a>
                    platform. AWS provides us with the online platform that allows us to offer our products and services
                    to you.
                    Your data may be stored through AWS’s data storage, databases, and the general AWS applications.
                    They store your data on secure servers behind a firewall.
                    See their
                    <a href="https://aws.amazon.com/privacy" target="_blank" rel="noopener noreferrer"
                       className="text-blue-500"> privacy policy </a>
                    for more information. The hosting site for our sales is
                    <a href="https://stripe.com/privacy"
                       target="_blank" rel="noopener noreferrer"
                       className="text-blue-500"> Stripe </a>. They have their own privacy policy as well.
                </p>

                <p className="text-gray-400 ">We may contact you to notify you regarding your account, to
                    troubleshoot problems with your account,
                    to resolve a dispute, to collect fees or monies owed, to poll your opinions through surveys or
                    questionnaires, to send updates about our company, or as otherwise necessary to contact you to
                    enforce our User Agreement, applicable national laws, and any agreement we may have with you. For
                    these purposes we may contact you via email, telephone, text messages, and postal mail.
                </p>

                <p className="text-gray-400 ">
                    If you don’t want us to process your data anymore, please contact us at <a
                    href="mailto:riddletheCity@gmail.com"
                    target="_blank" rel="noopener noreferrer"
                    className="text-blue-500 underline">riddletheCity@gmail.com</a>.
                    We reserve the right to modify this privacy policy at any time, so please review it frequently.
                    Changes and clarifications will take effect immediately upon their posting on the website. If we
                    make material changes to this policy, we will notify you here that it has been updated, so that you
                    are aware of what information we collect, how we use it, and under what circumstances, if any, we
                    use and/or disclose it.
                </p>

                <p className="text-gray-400 ">
                    If you would like to: access, correct, amend or delete any personal information we have about you,
                    you are invited to contact us at <a
                    href="mailto:riddletheCity@gmail.com"
                    target="_blank" rel="noopener noreferrer"
                    className="text-blue-500 underline">riddletheCity@gmail.com</a>.
                </p>
                </div>
            </div>
        </>
    )
}