import { Flex, Link } from '@chakra-ui/react';

const Header = () => {
  return (
    <Flex
      bg="gray.800"
      p={4}
      alignItems="center"
      justifyContent="flex-start"
      height="60px"
    >
      <Link href="https://notraffic.tech" isExternal>
        <img
          src="https://notraffic.tech/wp-content/themes/no-traffic-wp/public/img/bg/logo-1.png"
          alt="NoTraffic Logo"
          style={{ height: '30px', display: 'block' }}
        />
      </Link>
    </Flex>
  );
};

export default Header;
