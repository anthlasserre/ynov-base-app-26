import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealAlternate: string | null;
  strCategory: string;
  strArea: string;
  strCountry: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string;
  strYoutube: string;
  strIngredient1: string;
}

const searchRecipe = async (query: string): Promise<{ meals: Recipe[] }> => {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`,
  );
  return response.json();
};

function useSearchRecipe(query: string) {
  return useQuery<Recipe[], Error>({
    queryKey: ["recipes", query],
    queryFn: () => searchRecipe(query).then((data) => data?.meals),
    enabled: Boolean(query),
    staleTime: 0,
    gcTime: 0,
  });
}

export function useSearchRecipeWithDebounce(query: string) {
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);
    return () => clearTimeout(timeout);
  }, [query]);

  return useSearchRecipe(debouncedQuery);
}