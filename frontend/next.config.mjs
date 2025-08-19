/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ["res.cloudinary.com", "avatars.githubusercontent.com"],
	},
	experimental: {
		reactRoot: true,
		suppressHydrationWarning: true,
	},
};

export default nextConfig;