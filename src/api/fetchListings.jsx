import { useQuery, useQueryClient } from "@tanstack/react-query";

const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;

const fetchApi = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`);
  }

  const data = await response.json();
  // console.log(data);
  return data.results;
};

//Function to resize images
// const convertToWebp = async (src, maxWidth=300, maxHeight=200, quality = 0.9) => {
//   console.log(src);
//   return new Promise((resolve, reject) => {
//     //new Image() is functionally equivalent to document.createElement('img').
//     const img = new Image();
//     img.crossOrigin = "anonymous";
//     img.src = src;

//     img.onload = () => {
//       const canvas = document.createElement("canvas");
//       // Calculate the new size maintaining aspect ratio
//       let ratio = Math.min(maxWidth / img.width, maxHeight / img.height);
//       let newWidth = img.width * ratio;
//       let newHeight = img.height * ratio;

//       const ctx = canvas.getContext("2d");
//       ctx.drawImage(img, 0, 0, newWidth, newHeight);

//       canvas.toBlob(
//         (blob) => {
//           if (blob) {
//             const webUrl = URL.createObjectURL(blob);
//             resolve(webUrl);
//           } else {
//             reject(new Error("Conversion to WebP failed"));
//           }
//         },
//         "image/webp",
//         quality
//       );
//     };

//     img.onerror = () => {
//       reject(new Error("Failed to load image for conversion"));
//     };
//   });
// };
// ---------------------------------------------------------------

const filterData = async (results) => {
  if (!results || !Array.isArray(results)) {
    throw new Error("No results found");
  }

  const filteredData = results.map(
    ({
      DocumentID,
      ItemReceivedDate,
      SalesStatus,
      NumberOfEngines,
      SalesRep,
      LastModificationDate,
      OriginalPrice,
      Price,
      BoatLocation,
      ModelYear,
      MakeString,
      Model,
      BoatCategoryCode,
      BuilderName,
      BeamMeasure,
      NominalLength,
      Engines,
      BoatClassCode,
      GeneralBoatDescription,
      AdditionalDetailDescription,
      Images,
    }) => ({
      DocumentID,
      ItemReceivedDate,
      SalesStatus,
      NumberOfEngines,
      SalesRep,
      LastModificationDate,
      OriginalPrice,
      Price,
      BoatLocation,
      ModelYear,
      Model,
      BoatCategoryCode,
      MakeString,
      BuilderName,
      BeamMeasure,
      NominalLength,
      Engines,
      BoatClassCode,
      GeneralBoatDescription,
      AdditionalDetailDescription,
      Images,
    })
  );

  console.log(filteredData);
  return filteredData;

  //convert from png files to webp files
  //   const filteredResults = filteredData.map(async (result) => {
  //     console.log(result.Images[0].Uri);
  //     const uri = result.Images[0].Uri;

  //     try {
  //       //result.Images.map(convertToWebp) is as same as result.Images.map(src => convertToWebp(src))

  //       const thumbnail = await convertToWebp(uri);
  //       console.log(thumbnail);

  //       return {
  //         ...result,
  //         Thumbnail: thumbnail,
  //       };
  //     } catch (err) {
  //       console.error(err);
  //       return { ...result };
  //     }
  //   });

  //  const finalResults = await Promise.all(filteredResults);
  //  console.log('results', finalResults);

  //  return finalResults;
};

const fetchBoatListings = async () => {
  const url = `/api/inventory/search?key=${apiKey}&status=active,sale%20pending`;
  const results = await fetchApi(url);
  return filterData(results);
};

const fetchBoatListingById = async (id) => {
  const url = `/api/inventory/search?key=${apiKey}&DocumentID=${id}`;
  const results = await fetchApi(url);
  const filteredResults = await filterData(results); // Await the promise resolution
  console.log(filteredResults[0]);
  return filteredResults[0];
};

// useHooks
export const useBoatListings = () => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["boatListings"],
    queryFn: fetchBoatListings,
    initialData: () => queryClient.getQueryData(["boatListings"]),
  });
};

export const useBoatListingsById = (id) => {
  return useQuery({
    queryKey: ["boatListingsById", id],
    queryFn: () => fetchBoatListingById(id),
    enabled: !!id,
  });
};
