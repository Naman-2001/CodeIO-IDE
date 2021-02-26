import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Axios from "axios";

const Home = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  useEffect(() => {
    var myemail = prompt("Please enter your email");
    if (myemail) {
      setEmail(myemail);
    }
  }, []);

  const handleCreate = () => {
    Axios({
      method: "POST",
      // url: "http://localhost:8000/room/createroom",
      url: "https://codeio-backend.herokuapp.com/room/createroom",
      data: {
        email,
      },
    })
      .then((res) => {
        console.log(res.data.roomid);
        history.push(`/CodeIO-IDE/${res.data.id}/${res.data.roomid}`, [
          { email },
        ]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Button onClick={handleCreate}>Join Room</Button>
    </div>
  );
};

export default Home;
