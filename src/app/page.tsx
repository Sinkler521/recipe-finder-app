"use client"

import React, { useState, useEffect } from 'react';
import { IoIosSearch } from "react-icons/io";
import { toast } from "sonner";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useResultsFound } from "@/hooks/resultsContext";

export default function Home() {
  const [selectedCuisine, setSelectedCuisine] = useState("Greek");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [buttonNextEnabled, setButtonNextEnabled] = useState(false);

  const [titleValue, setTitleValue] = useState('');
  const [maxPrepTime, setMaxPrepTime] = useState('');

  const cuisines = ["Greek", "German", "American"];

  const router = useRouter();
  const { setResults } = useResultsFound();

  useEffect(() => {
    if (titleValue.trim() !== '' && maxPrepTime.trim() !== '') {
      setButtonNextEnabled(true);
    } else {
      setButtonNextEnabled(false);
    }
  }, [titleValue, maxPrepTime]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const maxPreparationTime = Number(maxPrepTime);
    const APIKEY = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY;

    if (!titleValue) {
      toast.warning('No title used');
      return;
    }

    if (maxPreparationTime && (maxPreparationTime > 900 || maxPreparationTime < 1)) {
      toast.warning('Please use correct max preparation time (> 0 and < 900)');
      return;
    }

    if (!APIKEY) {
      toast.warning('No api key used');
      return;
    }

    try {
      const responseLink = `https://api.spoonacular.com/recipes/complexSearch?query=${titleValue}&cuisine=${selectedCuisine}&maxReadyTime=${maxPreparationTime}&apiKey=${APIKEY}`;
      console.log(responseLink, 'responseLink');
      const response = await axios.get(responseLink);
      if (response.status === 200) {
        const result = response.data;
        if (result.results && result.results.length > 0) {
          setResults(result.results);
          router.push('/results');
        } else {
          toast.warning('Nothing found using these parameters');
        }
      }
    } catch (error) {
      console.log('Error occured trying to search', error);
      toast.error('Error trying to search');
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center bg-gray-950 min-h-screen">
      <div className="w-1/2 h-full flex flex-col items-center justify-center">
        <h1 className="text-gray-200 text-7xl text-center">Recipe finder</h1>
        <div className="input-group w-full mt-4">
          <form onSubmit={onSubmit} className="flex justify-center">
            <input
              type="text"
              name="title"
              placeholder="Enter recipe title"
              value={titleValue}
              onChange={(e) => setTitleValue(e.target.value)}
              className="h-9 bg-gray-900 outline-none caret-white pl-2 text-gray-200 text-xl rounded-l-lg"
            />
            <div className="relative">
              <button
                type="button"
                className="h-9 px-4 bg-gray-800 text-gray-200 text-xl flex items-center"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {selectedCuisine}
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-1 w-full bg-gray-800 text-gray-200 rounded-md shadow-lg z-10 transition-all duration-300">
                  {cuisines.map((cuisine) => (
                    <div
                      key={cuisine}
                      className="cursor-pointer px-4 py-2 hover:bg-gray-700"
                      onClick={() => {
                        setSelectedCuisine(cuisine);
                        setDropdownOpen(false);
                      }}
                    >
                      {cuisine}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <input
              type="number"
              name="maxpreptime"
              min={1}
              max={900}
              placeholder="Prep Time"
              value={maxPrepTime}
              onChange={(e) => setMaxPrepTime(e.target.value)}
              className="w-12 h-9 p-1 outline-none bg-gray-400"
            />
            <button
              type={buttonNextEnabled ? "submit" : "button"}
              disabled={!buttonNextEnabled}
              className={`h-9 p-1 rounded-r-lg bg-gray-600 transition-all flex items-center justify-center ${buttonNextEnabled ? 'hover:bg-gray-500' : ''}`}
            >
              <IoIosSearch size={24} className="text-gray-200" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}