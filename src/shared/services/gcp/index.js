import axios from "axios";

async function runGcp() {
	try {
	  const response = await axios.get("https://fogonomato-qdkzaivqyq-uc.a.run.app/run");
	  console.log(response.data);
	} catch (error) {
	  console.error("Erro:", error);
	}
  }
  
 
  
  export default runGcp;
