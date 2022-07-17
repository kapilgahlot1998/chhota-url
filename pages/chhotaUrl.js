import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../styles/Home.module.css";

export default function ChhotaUrl() {
  const router = useRouter();
  const user = router.query;

  const userId = user.userId;
  const [longUrl, setLongUrl] = useState("");
  const [chhotaUrl, setChhotaUrl] = useState("");


  const callAPI = async () => {
    try {
      const urlDetails = {userId : userId, longUrl: longUrl};
      console.log(urlDetails);
      const chhotaUrlDetails = await fetch("https://chhota-url.herokuapp.com/chhotaUrl/url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(urlDetails),
      }).then(data => data.json());

      console.log(chhotaUrlDetails);
      setChhotaUrl(chhotaUrlDetails.chhotaUrl)
      
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <main className={styles.main}>
        <h1>Hello Mr. {user.userEmail}</h1>
        <h1 className={styles.title}>Create Your Chhota URL</h1>
        <div className={styles.urlCreateBox}>
          <input
            className={styles.urlInput}
            required
            type="text"
            id="longUrl"
            name="longUrl"
            placeholder="Enter Your Long Url"
            value={longUrl}
            onChange={data => setLongUrl(data.target.value)}
          />
          <button className = {styles.submitButton} onClick={callAPI}>Chhota URL</button>
          {chhotaUrl ? <h3>Your Chhota URL : {chhotaUrl}</h3>:""}
          
        </div>
      </main>
    </>
  );
}
