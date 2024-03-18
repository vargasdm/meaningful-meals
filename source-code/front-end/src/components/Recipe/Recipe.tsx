import axios from "axios";
import { useLoaderData } from "react-router-dom";
const PORT = process.env.REACT_APP_PORT;
const URL = `http://localhost:${PORT}/recipes`;
export async function loader({ params }: any) {
  try {
    const res = await axios.get(`${URL}?id=${params.id}`);

    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export default function Recipe() {
  const data: any = useLoaderData();
  console.log(data);

  const instructions: any = data.analyzedInstructions[0].steps.map(
    (step: any) => <li key={step.number}>{step.step}</li>
  );
  const ingredients: any = data.nutrition.ingredients.map(
    (ingridients: any) => <li key={ingridients.id}><span>{ingridients.amount}</span><span>{ingridients.unit}</span>{ingridients.name}</li>
  );

  return (
    <>
      <h1>{data.title}</h1>
      <img src={data.image} alt={data.title} />
      {/* maybe add summary data, will have to format it since it containst html elements in the data */}
      <h2>Ingredients</h2>
      <ul>{ingredients}</ul>
      <h2>Instructions</h2>
      <ol>{instructions}</ol>
    </>
  );
}
