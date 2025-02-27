import Image from "next/image"

export default function AuthLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen">
            {/* Left Section (Children) */}
            <div className="flex-1 flex flex-col gap-y-5 items-center justify-center bg-white">
                <h3 className="text-4xl z-10 font-bold text-primaryColor">Mentail   </h3>
                {children}
            </div>

            {/* Right Section (Image) */}
            <div className="flex-1 relative hidden md:block">
                <Image
                    src={'/carepulse.svg'}
                    alt="test"
                    width={800}
                    height={800}
                    className="rounded-lg"
                />
            </div>
        </div>
    );
}