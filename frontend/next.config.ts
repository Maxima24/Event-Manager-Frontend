/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["example.com",'res.cloudinary.com'], // add the hostname here
  },
};

module.exports = nextConfig;