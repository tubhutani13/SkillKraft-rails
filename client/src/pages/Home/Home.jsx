import api from "../../utils/api";
import Carousel from "../../components/Carousel/Carousel";
import { useEffect, useState } from "react";

function Home() {
    // const users = [
    //     {
    //         "name": "Michal Nolan DO",
    //         "username": "harold",
    //         "email": "ricardo@williamson-williamson.test",
    //         "profile_picture": "http://localhost:3000/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6NTMsInB1ciI6ImJsb2JfaWQifX0=--aeec6b9695092f8aa3287d29b401888c9ce50468/avatar.jpg",
    //         "learning_skill_ids": [
    //             40,
    //             10,
    //             20,
    //             2,
    //             15,
    //             29,
    //             19,
    //             37
    //         ],
    //         "expert_skill_ids": [
    //             22,
    //             43,
    //             17,
    //             2,
    //             45,
    //             34,
    //             40,
    //             6
    //         ]
    //     },
    //     {
    //         "name": "Rev. Penni Orn",
    //         "username": "karin",
    //         "email": "lance@mertz.test",
    //         "profile_picture": "http://localhost:3000/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6NDIsInB1ciI6ImJsb2JfaWQifX0=--c9e9bf893e4210c58f10187b99a7c81bceece1a6/avatar.jpg",
    //         "learning_skill_ids": [
    //             4,
    //             24,
    //             41,
    //             39,
    //             5,
    //             3,
    //             8,
    //             35
    //         ],
    //         "expert_skill_ids": [
    //             49,
    //             33,
    //             5,
    //             14,
    //             9,
    //             15,
    //             22,
    //             26
    //         ]
    //     },
    //     {
    //         "name": "Mary Labadie",
    //         "username": "diego",
    //         "email": "pearly_shanahan@collins-zboncak.test",
    //         "profile_picture": "http://localhost:3000/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6NDYsInB1ciI6ImJsb2JfaWQifX0=--891a7fece4e6daad041e97e64be4e15fe4cd042f/avatar.jpg",
    //         "learning_skill_ids": [
    //             11,
    //             19,
    //             25,
    //             45,
    //             13,
    //             27,
    //             26,
    //             22
    //         ],
    //         "expert_skill_ids": [
    //             24,
    //             35,
    //             16,
    //             8,
    //             21,
    //             49,
    //             28,
    //             12
    //         ]
    //     },
    //     {
    //         "name": "Mrs. Boris Kuhn",
    //         "username": "milagros",
    //         "email": "eusebio_larson@carter.test",
    //         "profile_picture": "http://localhost:3000/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6NDcsInB1ciI6ImJsb2JfaWQifX0=--afb033c74b1bb7a16f890d40eff6e6e4985145a9/avatar.jpg",
    //         "learning_skill_ids": [
    //             31,
    //             45,
    //             19,
    //             20,
    //             34,
    //             25,
    //             36,
    //             32
    //         ],
    //         "expert_skill_ids": [
    //             13,
    //             7,
    //             26,
    //             16,
    //             10,
    //             12,
    //             34,
    //             20
    //         ]
    //     },
    //     {
    //         "name": "Homer Reynolds",
    //         "username": "minh",
    //         "email": "enoch_nolan@schmidt.example",
    //         "profile_picture": "http://localhost:3000/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6NDksInB1ciI6ImJsb2JfaWQifX0=--90d7e4c08473ecfee535f5aacec46012882f67f3/avatar.jpg",
    //         "learning_skill_ids": [
    //             28,
    //             47,
    //             29,
    //             23,
    //             31,
    //             37,
    //             5,
    //             35
    //         ],
    //         "expert_skill_ids": [
    //             23,
    //             33,
    //             48,
    //             36,
    //             5,
    //             15,
    //             37,
    //             45
    //         ]
    //     },
    //     {
    //         "name": "Ted Christiansen",
    //         "username": "angelo.jacobson",
    //         "email": "eli_legros@toy.test",
    //         "profile_picture": "http://localhost:3000/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6NTAsInB1ciI6ImJsb2JfaWQifX0=--3dfea3471e7923dd9616288142d13db18ec5e05c/avatar.jpg",
    //         "learning_skill_ids": [
    //             48,
    //             33,
    //             11,
    //             4,
    //             30,
    //             16,
    //             21,
    //             43
    //         ],
    //         "expert_skill_ids": [
    //             27,
    //             2,
    //             41,
    //             32,
    //             15,
    //             18,
    //             38,
    //             42
    //         ]
    //     },
    //     {
    //         "name": "Msgr. Ayana Auer",
    //         "username": "leslie",
    //         "email": "eneida@baumbach.example",
    //         "profile_picture": "http://localhost:3000/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6NTIsInB1ciI6ImJsb2JfaWQifX0=--4b25ddfd1cd7fe64d79f6038232487f1a16ee904/avatar.jpg",
    //         "learning_skill_ids": [
    //             29,
    //             43,
    //             24,
    //             33,
    //             12,
    //             41,
    //             36,
    //             2
    //         ],
    //         "expert_skill_ids": [
    //             24,
    //             1,
    //             28,
    //             41,
    //             10,
    //             17,
    //             40,
    //             22
    //         ]
    //     },
    //     {
    //         "name": "Mariko Prohaska II",
    //         "username": "shenna",
    //         "email": "lorette.price@kiehn.example",
    //         "profile_picture": "http://localhost:3000/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6MzYsInB1ciI6ImJsb2JfaWQifX0=--197ebc89ec2c736a55c9e8db08a0a3c98e2a61a8/avatar.jpg",
    //         "learning_skill_ids": [
    //             16,
    //             1,
    //             20,
    //             10,
    //             37,
    //             39,
    //             8,
    //             28
    //         ],
    //         "expert_skill_ids": [
    //             18,
    //             32,
    //             17,
    //             43,
    //             46,
    //             8,
    //             34,
    //             7
    //         ]
    //     }
    // ]
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await api.get('/users/recommended_mentors')
                const mentors = response.data
                setUsers(mentors)
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchProfile();
    }, []);
    return (
        <div>
            <h2>Recommended Mentors</h2>
            <div>
                <Carousel recommendedUsers={users}></Carousel>
            </div>
        </div>
    )
}

export default Home;
