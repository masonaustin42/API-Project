import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function SpotDetails() {
  const { id } = useParams();
  return <h2>Hello from Spot Details {id}</h2>;
}

export default SpotDetails;
