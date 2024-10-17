import {Flex, Heading, Image} from "@chakra-ui/react";

const HeaderLulus = ()=>{
    return (
        <Flex alignItems='center' justifyContent={'space-between'} p={6} bgGradient={'linear(to-r, #0e6308, #32bd00)'} w={'full'} h={'auto'} borderTopLeftRadius={10} borderTopRightRadius={10}>
            <Heading color={'white'} fontWeight={'900'} fontFamily={'Lato'} letterSpacing={1} fontSize={['1.1rem','1.3rem','1.7rem']}>SELAMAT KAMU DINYATAKAN LULUS SELEKSI <br/> OSIS SMK HS AGUNG 2024</Heading>
            <Image src={'/img/main-logo.png'} h={'86px'} ml={10} mr={5} alt={'Icon'} />
        </Flex>
    )
}
export default HeaderLulus
