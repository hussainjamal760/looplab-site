import ContactPageClient from '@/features/contact/components/ContactPageClient';

export const metadata = {
    title: "Contact Us — Looplab | Campus Tech Community",
    description: "Get in touch with Looplab. Partner with Pakistan's leading campus tech network, sponsor hackathons, or launch student ambassador programs.",
    openGraph: {
        title: "Contact Looplab — Let's Make Something Worth Remembering",
        description: "Reach out for campus tech partnerships, brand sponsorships, ambassador inquiries, and tech events.",
        url: "https://looplab.co/contact",
        siteName: "Looplab",
        type: "website",
    },
};

export default function ContactPage() {
    return <ContactPageClient />;
}
