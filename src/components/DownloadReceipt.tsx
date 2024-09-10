import React from "react";

const DownloadReceipt = ({ message }: { message: string }) => {
  const heruAcuseRegex = /(www\.heru\.com\/acuses\/[^\s]+)/g;

  console.log(message.replace(heruAcuseRegex, (url) => ` `));

  const fetchAnnualOverview = async (userId: string, year: string) => {
    try {
      const response = await fetch(
        `https://api2.heru.app/tax/fiscal-profile/declarations/annual-overview/${userId}/${year}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch annual overview");
      }

      const data = await response.json();
      console.log(data);

      return data.resource;
    } catch (error) {
      console.error("Error fetching annual overview:", error);
      throw error;
    }
  };

  return <div>DownloadReceipt</div>;
};

export default DownloadReceipt;
