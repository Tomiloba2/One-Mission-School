import {
    Html,
    Head,
    Preview,
    Img,
    Body,
    Container,
    Text,
    Button,
    Tailwind,
    Section,
    Heading,
    Hr,
} from "@react-email/components";

interface AuthEmailProps {
    name?: string;
    actionUrl: string;
    preview: string,
    title: string,
    description: string,
    cta: string,
    footer: string,

}

export function AuthEmail({
    name,
    actionUrl, cta,
    preview, title, description, footer
}: AuthEmailProps) {
    return (
        <Tailwind>
            <Html>
                <Head />
                <Preview>{preview}</Preview>
                <Body style={{ fontFamily: "Arial, sans-serif" }}>
                    <Container className="bg-white border-r-16 p-10 max-w-130 mx-0 my-auto">
                        <Section className="flex justify-center mb-6">
                            <Img
                                src="../../public/images/OMSlogo.png"
                                width={72} height={72}
                                className="rounded-full object-cover border-[3px] border-[#f1f1f1]"
                            />
                        </Section>
                        <Heading className="text-[26px] text-center mb-5">
                            {title}
                        </Heading>

                        <Text className="text-[16px] text-[#333] text-center leading-6.5">Hi {name || "there"},</Text>

                        <Text className="text-[16px] text-[#333] text-center leading-6.5">
                            {description}
                        </Text>
                        <Section className="text-center mx-8 my-0">
                            <Button
                                href={actionUrl}
                                className="bg-blue-700  text-white px-3.5 py-6 border-r-10 text-[15px] font-bold "

                            >
                                {cta}
                            </Button>
                        </Section>

                        <Text className="text-center text-[#6b7280] text-[13px]">
                            If the button doesn't work, copy and paste this link into your browser:
                        </Text>
                        <Text className="text-[13px] text-[#2563eb] text-center break-all">
                            {actionUrl}
                        </Text>
                        <Hr className="mx-7 my-0" />
                        <Text className="text-[12px] text-[#9ca3af] text-center">
                            {footer}
                        </Text>
                    </Container>
                </Body>
            </Html>
        </Tailwind>
    );
}