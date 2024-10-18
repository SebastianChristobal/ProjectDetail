import { useState, useEffect } from "react";
import { IProject } from "../models/IProject";

const useFetch = (
  fetchProjectFn: (params: { context: any }) => Promise<IProject[]>, // Properly type fetchProjectFn
  context: any,
  initialValue: IProject[] = [] // Ensure the initial value is typed correctly
): { fetchData: IProject[] } => {
  const [fetchData, setFetchData] = useState<IProject[]>(initialValue);

  useEffect(() => {
    const fetchDataAsync = async (): Promise<void> => {
      try {
        const projects = await fetchProjectFn({ context });
        setFetchData(projects); // Set the fetched data
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchDataAsync().catch((err) => {
      console.error("Error in fetching data:", err);
    });
  }, [fetchProjectFn, context]); // Ensure context is a stable dependency, or pass in a memoized context object if needed

  return { fetchData };
};

export default useFetch;
