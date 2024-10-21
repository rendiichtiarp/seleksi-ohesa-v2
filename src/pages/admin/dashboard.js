import {
    Text,
    Flex,
    Box,
    Heading,
    SimpleGrid,
    Th,
    Tr,
    Td,
    Tbody,
    Thead,
    Table, TableContainer
} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {MdPeople} from "react-icons/md";
import {AiFillEye} from "react-icons/ai";
import {deleteCookie} from "cookies-next";
import Head from "next/head";
import axios from "axios";
import {ENV} from "@/utility/const";
import { Select } from "@chakra-ui/react";

const Dashboard = ({data,setUsername,siswa})=>{
    const [filter, setFilter] = useState("all");

    useEffect(()=>{
        setUsername(data.username)
    })
    const filteredSiswa = siswa.listsiswa.filter(item => {
        if (filter === "opened") return item.isOpen === 1;
        if (filter === "not-opened") return item.isOpen !== 1;
        return true; // "all" case
    });

    return(
        <>
            <Head>
                <title>Dashboard</title>
            </Head>
                <Box bg={'#614BFE'} pb={10}>
                    <Heading fontFamily={'Lato'} p={10} color={'white'}>Dashboard</Heading>
                    <SimpleGrid spacing={10} columns={[1, 2, 4]} p={10}>
                        <Box bg={'white'} p={8}  h={200} minW={'24%'} borderRadius={6} mb={5} >
                            <Flex flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
                                <Box>
                                    <Text color={'gray.500'} fontFamily={'Lato'} fontWeight={'900'} fontSize={'2xl'} mb={5}>Siswa</Text>
                                    <Text color={'gray.700'} fontFamily={'Lato'} fontWeight={'900'} fontSize={'4xl'}>{siswa.total ?? 0}</Text>
                                </Box>
                                <MdPeople size={80} color={'blue'}/>
                            </Flex>
                        </Box>
                        <Box bg={'white'} p={8}  h={200} minW={'24%'} borderRadius={6} mb={5}>
                            <Flex flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
                                <Box>
                                    <Text color={'gray.500'} fontFamily={'Lato'} fontWeight={'900'} fontSize={'2xl'} mb={5}>Lulus</Text>
                                    <Text color={'gray.700'} fontFamily={'Lato'} fontWeight={'900'} fontSize={'4xl'}>{siswa.lulus ?? 0}</Text>
                                </Box>
                                <MdPeople size={80} color={'green'}/>
                            </Flex>
                        </Box>
                        <Box bg={'white'} p={8}  h={200} minW={'24%'} borderRadius={6} mb={5}>
                            <Flex flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
                                <Box>
                                    <Text color={'gray.500'} fontFamily={'Lato'} fontWeight={'900'} fontSize={'2xl'} mb={5}>Tidak Lulus</Text>
                                    <Text color={'gray.700'} fontFamily={'Lato'} fontWeight={'900'} fontSize={'4xl'}>{siswa.tidaklulus ?? 0}</Text>
                                </Box>
                                <MdPeople size={80} color={'red'}/>
                            </Flex>
                        </Box>
                        <Box bg={'white'} p={8} h={200} minW={'24%'} borderRadius={6} mb={5}>
                            <Flex flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
                                <Box>
                                    <Text color={'gray.500'} fontFamily={'Lato'} fontWeight={'900'} fontSize={'2xl'} mb={5}>Dibuka</Text>
                                    <Text color={'gray.700'} fontFamily={'Lato'} fontWeight={'900'} fontSize={'4xl'}>{siswa.dibuka ?? 0}</Text>
                                </Box>
                                <AiFillEye size={80} color={'orange'}/>
                            </Flex>
                        </Box>
                    </SimpleGrid>
                    <Box bg={'white'} mx={10} p={10} borderRadius={6}>
                        <Text color={'gray.500'} fontFamily={'Lato'} fontWeight={'900'} fontSize={'2xl'} mb={8}>Riwayat</Text>
                        <Select mb={4} onChange={(e) => setFilter(e.target.value)} value={filter} width="200px">
                            <option value="all">Semua</option>
                            <option value="opened">Sudah Dibuka</option>
                            <option value="not-opened">Belum Dibuka</option>
                        </Select>
                        <TableContainer>
                            <Table variant='simple' colorScheme='teal'>
                                <Thead>
                                    <Tr>
                                        <Th>No Peserta</Th>
                                        <Th>Nama</Th>
                                        <Th>Status</Th>
                                        <Th>Waktu Dibuka</Th>
                                        <Th>Keterangan</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {
                                        filteredSiswa.map((item, index) => (
                                            <Tr key={index}>
                                                <Td>{item.nopeserta}</Td>
                                                <Td>{item.name}</Td>
                                                <Td>{item.status !== 1 ? 'Tidak Lulus' : 'Lulus'}</Td>
                                                <Td>{item.openDate}</Td>
                                                <Td>{item.isOpen !== 1 ? 'Belum Dibuka' : 'Sudah Dibuka'}</Td>
                                            </Tr>
                                        ))
                                    }
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </Box>
            </Box>
            </>
    )
}

export async function getServerSideProps(context) {
    const { req,res } = context
    const { headers } = req
    // fetch data
    try {
        const users = await axios.get(`${ENV.base}/api/user`, {
            credentials: 'same-origin',
            headers:{
                cookie: headers.cookie
            }
        });

        const dashboard = await axios.get(`${ENV.base}/api/admin/dashboard`, {
            credentials: 'same-origin',
            headers:{
                cookie: headers.cookie
            }
        });
        const user = await users.data
        const {data} = await dashboard.data
        if (user.status === 401) {
            deleteCookie('token-key-adm', { req, res });
            return {
                redirect: {
                    destination: '/admin/login',
                    permanent: false,
                },
            }
        }
            return {
                props: {
                    data : user.data,
                    siswa : data
                },
            }
    } catch(err) {
        return {
            redirect: {
                destination: '/admin/login',
                permanent: false,
            },
        }
    }
}

export default Dashboard
