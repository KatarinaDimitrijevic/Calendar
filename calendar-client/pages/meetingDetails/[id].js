import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const MeetingDetails = () => {
    const router = useRouter();
    const {id} = router.query;

    console.log(id);

    return(
        <div>
            Test
        </div>
    )
};


export default MeetingDetails;