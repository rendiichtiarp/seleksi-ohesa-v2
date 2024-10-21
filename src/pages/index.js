import Head from 'next/head'
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormHelperText,
    FormLabel,
    Heading,
    Image,
    Input, ScaleFade,
    Text, useToast
} from "@chakra-ui/react";
import {useState} from "react";
import ModalErrorAPI from "@/components/Modals/Error";
import {useRouter} from "next/router";
import axios from 'axios'
import {ENV} from "@/utility/const";


export default function Home({data,isClosed}) {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const toast = useToast()

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true)
        const formData = new FormData(event.target);

        const nopeserta = formData.get("nopeserta");

        // Perform submit logic, such as sending data to a server
       try{
           const response = await axios.post('/api/student/login',{
            nopeserta: nopeserta,
           }, {
               headers: {
                   'Content-Type': 'application/json'
               },
               body: JSON.stringify({
                nopeserta: nopeserta,
               })
           })
           const data = await response.data
           if (data.status !== 200) throw new Error('Siswa Tidak Ditemukan')
           await router.push('/result')
       } catch (e){
           toast({
               title: e.message,
               status:'error',
               position: 'top-right',
               isClosable: true,
           })
       } finally {
           setIsLoading(false)
       }
    };
    return (
    <>
      <Head>
        <title>{data.nama_sekolah}</title>
        <meta name="description" content="Made by Rendiichtiar with ❤️" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
        {
            !data || isClosed &&
            <ModalErrorAPI />
        }
          <ScaleFade initialScale={0.5} in={true}>
          <Box p={8} bgColor='rgba(0,0,0,0.3)' w={'full'} maxW={['full',700,700]} backdropBlur={"md"} borderRadius='10px'>
              <Flex flexDirection={'row'} justifyContent={'center'} alignItems={'center'} mb={5}>
                  <Image src={'/img/main-logo.png'} h={['80px','90px',null]} alt={'Icon'} />
              </Flex>
              <Heading color={'white'} fontWeight={'900'} fontFamily={'Lato'} letterSpacing={1} mt={0} mb={1} fontSize={['1rem','1.8rem','2.2rem']}>{data.judul_web ?? 'Error'}</Heading>
              <Text color={'#999'} fontFamily={'Lato'} mb={'30px'}>Cek hasil seleksi peserta anggota baru</Text>
              <form onSubmit={handleSubmit}>
                  <FormControl>
                      <FormLabel fontFamily={'Lato'} fontWeight={'900'} mb={2} fontSize={'0.9rem'} color={'#88ccf0'}>Nomor Peserta</FormLabel>
                      <Input 
                          name={'nopeserta'} 
                          color={'white'} 
                          focusBorderColor={'#999'} 
                          size='lg' 
                          border={'none'} 
                          borderRadius={'5px'} 
                          bg={'rgba(250,250,250,0.2)'} 
                          fontSize={['0.8rem','1rem','1.2rem']} 
                          fontWeight={'700'} 
                          type='number' 
                          py={'18px'} 
                          px={'18px'} 
                          placeholder={'Masukan nomor peserta disini'} 
                          maxLength={10} 
                          onInput={(e) => e.target.value = e.target.value.slice(0, 10)}
                      />
                      <FormHelperText mb={8}>Nomor peserta harus terdiri dari 10 digit angka</FormHelperText>
                      <Button
                          mt={6}
                          isLoading={isLoading}
                          loadingText='Loading'
                          colorScheme='blue'
                          type="submit"
                          variant='solid'
                          spinnerPlacement='start'
                          borderRadius={5}
                      >
                          {data.button_label ?? 'Submit'}
                      </Button>
                  </FormControl>
              </form>
          </Box>
          <Text color={'#999'} fontSize={'0.8rem'} fontFamily={'Lato'} mb={'30px'}>
            Dibuat oleh <a href="https://www.instagram.com/rendiichtiar" target="_blank" rel="noopener noreferrer" style={{ color: '#999', textDecoration: 'underline' }}>@rendiichtiar</a> dengan ❤️ | Copyright © 2024
          </Text>
          </ScaleFade>
    </>
  )
}

// This gets called on every request
export async function getServerSideProps() {

    let data;
    // Fetch data from external API
    const res = await axios.get(`${ENV.base}/api/info`)

    if (res.status === 200) {
        data = res.data;
    } else {
        data = null
    }

    // Pass data to the page via props
    return { props: { data: data?.data, isClosed : data?.data.isOpen === 0 } }
}
