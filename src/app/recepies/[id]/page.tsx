"use client"

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { useResultsFound } from "@/hooks/resultsContext";
import { toast } from "sonner";

export default function RecipePage() {
  const router = useRouter();
  const params = useParams();
  const { results } = useResultsFound();

  const recipeId = Number(params.id);
  const recipe = results ? results.find((r: any) => r.id === recipeId) : null;

  useEffect(() => {
    if (!results || !recipe) {
      router.push("/");
    }
  }, [results, recipe, router]);

  const [recipeDetails, setRecipeDetails] = useState<any>(null);

  useEffect(() => {
    if (recipe) {
      const fetchRecipeDetails = async () => {
        const APIKEY = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY;
        if (!APIKEY) {
          router.push("/");
          toast.warning("No API key used");
          return;
        }
        try {
          const response = await axios.get(
            `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${APIKEY}`
          );
          if (response.status === 200) {
            setRecipeDetails(response.data);
          } else {
            router.push("/");
            toast.error("Error fetching recipe details");
          }
        } catch (error) {
          console.error("Error fetching recipe details", error);
          router.push("/");
          toast.error("Error fetching recipe details");
        }
      };

      fetchRecipeDetails();
    }
  }, [recipe, recipeId, router]);

  if (!recipeDetails) {
    return (
      <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-200">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-gray-800 p-4 overflow-auto">
      <div className="w-1/2 mx-auto bg-gray-900 rounded-lg shadow-md p-6">
        <h1 className="text-3xl text-gray-200 mb-4">{recipeDetails.title}</h1>
        <img
          src={recipeDetails.image}
          alt={recipeDetails.title}
          className="w-full h-64 object-cover rounded-md mb-4"
        />
        <p className="text-gray-400 mb-2">
          <strong>Preparation Time:</strong> {recipeDetails.readyInMinutes} minutes
        </p>
        <p className="text-gray-400 mb-4">
          <strong>Servings:</strong> {recipeDetails.servings}
        </p>
        <h2 className="text-2xl text-gray-200 mb-2">Ingredients</h2>
        <ul className="list-disc list-inside text-gray-200">
          {recipeDetails.extendedIngredients &&
            recipeDetails.extendedIngredients.map((ingredient: any) => (
              <li key={ingredient.id}>{ingredient.original}</li>
            ))}
        </ul>
      </div>
    </div>
  );
}