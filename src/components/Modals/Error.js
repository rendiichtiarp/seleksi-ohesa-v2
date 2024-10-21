import {Modal, ModalBody, ModalContent, ModalOverlay, Text, useDisclosure} from "@chakra-ui/react";

const ModalErrorAPI = ()=>{
    const {onClose } = useDisclosure()

    return (
        <Modal isCentered isOpen={true} onClose={onClose}>
            <ModalOverlay
                bg='blackAlpha.100'
                backdropFilter='blur(10px) hue-rotate(50deg)'
            />
            <ModalContent width={"auto"} borderRadius="md" boxShadow="lg">
                <ModalBody bg={'gray.900'} p={10} textAlign={'center'} borderRadius="md">
                    <Text color={'white'} fontFamily={'Lato'} fontSize={'xl'} mb={4}>
                        Cek hasil seleksi belum dibuka nih! Tungguin aja sampe buka hehe 😁
                    </Text>
                    <Text color={'gray.300'} fontFamily={'Lato'} fontSize={'md'}>
                        <a href="https://wa.me/+6281284900651" target="_blank" rel="noreferrer" style={{ color: 'lightblue' }}>Klik disini</a> untuk menghubungi admin.
                    </Text>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default ModalErrorAPI
