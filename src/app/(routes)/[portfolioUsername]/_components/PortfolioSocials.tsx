import { CardContainer, CardBody, CardItem } from '@/components/ui/3d-card';
import Link from 'next/link';
import React from 'react';

const PortfolioSocials = ({ socialMediaLinks }) => {
  // Convert the socialLinks object into an array of entries (key-value pairs)
  const socialMediaArray = Object.entries(socialMediaLinks)
    // Filter out entries where the URL is null or undefined
    .filter(([platform, url]) => url !== null && url !== undefined);

  return (
    <div className='grid grid-cols-3'>
      {socialMediaArray.length === 0 ? (
        <div>No social media links available.</div> // Handle case when no valid links exist
      ) : (
        socialMediaArray.map(([platform, url], index) => (
          <CardContainer className="inter-var" key={index}>
            <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-neutral-600 dark:text-white"
              >
                {platform} Social
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
              >
                Connect with me on {platform}.
              </CardItem>
              <CardItem translateZ="100" className="w-full mt-4">
                <h1>{platform}</h1>
              </CardItem>
              <div className="flex justify-between items-center mt-20">
                <CardItem
                  translateZ={20}
                  as={Link}
                  href={url}
                  target="__blank"
                  className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                >
                  Try now →
                </CardItem>
                <CardItem
                  translateZ={20}
                  as="button"
                  className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                >
                  Sign up
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>
        ))
      )}
    </div>
  );
};

export default PortfolioSocials;