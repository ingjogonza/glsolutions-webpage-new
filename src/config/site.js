// Get site URL from environment variable, use default value if not set
// Note: Please set the correct PUBLIC_SITE_URL in .env file after first deployment
const SITE_URL =
	import.meta.env.PUBLIC_SITE_URL || "https://www.glsolutions.tech";

export const siteConfig = {
	title: "GL Solutions",
	author: "Jorge González & Carlos Lameda",
	url: SITE_URL,
	mail: "hola@glsolutions.tech",
	utm: {
		source: `${SITE_URL}`,
		medium: "referral",
		campaign: "navigation",
	},
	meta: {
		title: "GL Solutions — Spec Driven Development para Chile y Latinoamérica",
		description:
			"GL Solutions: Spec Driven Development para startups B2B SaaS y Fintech en Chile y Latinoamérica. Software que cualquier ingeniero puede entender desde el día uno.",
		keywords:
			"Spec Driven Development, SDD, consultoría de software, startups Fintech, desarrollo de software Chile, B2B SaaS Latinoamérica",
		image: `${SITE_URL}/og.jpg`,
		twitterHandle: "",
	},
	// social links — GL Solutions does not have Twitter/X or GitHub presence yet
	social: {
		twitter: "",
		twitterName: "", // empty until a real handle exists; was leaking "RicoUI" into Twitter Cards
		github: "",
	},
};
