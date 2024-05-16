"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { fetchExchangeRate } from "@/lib/currencyConverter";

// Import Icons
import { ArrowDown2, ArrowRight3 } from "iconsax-react";
// Import Images
import germanFlag from "../../../public/Images/germany.svg";
import ukFlag from "../../../public/Images/united kingdom.svg";
import usFlag from "../../../public/Images/united states.svg";
import chinaFlag from "../../../public/Images/china.svg";
import canadaFlag from "../../../public/Images/canada.svg";
import japanFlag from "../../../public/Images/japan.svg";
import australiaFlag from "../../../public/Images/australia.svg";
import brazilFlag from "../../../public/Images/brazil.svg";
import bulgariaFlag from "../../../public/Images/bulgaria.svg";
import icelandFlag from "../../../public/Images/iceland.svg";
import indiaFlag from "../../../public/Images/india.svg";
import indonesiaFlag from "../../../public/Images/indonesia.svg";
import malaysiaFlag from "../../../public/Images/malaysia.svg";
import norwayFlag from "../../../public/Images/norway.svg";
import philippinesFlag from "../../../public/Images/philippines.svg";
import southAfricaFlag from "../../../public/Images/south africa.svg";
import southKoreaFlag from "../../../public/Images/south korea.svg";
import swedenFlag from "../../../public/Images/sweden.svg";

type Currency = {
    flag: any;
    country: string;
    symbol: string;
}

type CurrencyData = {
    [key: string]: Currency;
}

const currencyData: CurrencyData = {
    united: { flag: ukFlag, country: "United Kingdom", symbol: "GBP" },
    america: { flag: usFlag, country: "United States", symbol: "USD" },
    canada: { flag: canadaFlag, country: "Canada", symbol: "CAD" },
    china: { flag: chinaFlag, country: "China", symbol: "CNY" },
    japan: { flag: japanFlag, country: "Japan", symbol: "JPY" },
    germany: { flag: germanFlag, country: "Germany", symbol: "EUR" },
    australia: { flag: australiaFlag, country: "Australia", symbol: "AUD" },
    brazil: { flag: brazilFlag, country: "Brazil", symbol: "BRL" },
    bulgaria: { flag: bulgariaFlag, country: "Bulgaria", symbol: "BGN" },
    iceland: { flag: icelandFlag, country: "Iceland", symbol: "ISK" },
    india: { flag: indiaFlag, country: "India", symbol: "INR" },
    indonesia: { flag: indonesiaFlag, country: "Indonesia", symbol: "IDR" },
    malaysia: { flag: malaysiaFlag, country: "Malaysia", symbol: "MYR" },
    norway: { flag: norwayFlag, country: "Norway", symbol: "NOK" },
    philippines: { flag: philippinesFlag, country: "Philippines", symbol: "PHP" },
    southAfrica: { flag: southAfricaFlag, country: "South Africa", symbol: "ZAR" },
    southKorea: { flag: southKoreaFlag, country: "South Korea", symbol: "KRW" },
    sweden: { flag: swedenFlag, country: "Sweden", symbol: "SEK" },
};

const Convert = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalOpen1, setModalOpen1] = useState(false);
    const [beforeCurrency, setBeforeCurrency] = useState<keyof typeof currencyData>("america");
    const [chosenCurrency, setChosenCurrency] = useState<keyof typeof currencyData>("united");
    const [convertedAmount, setConvertedAmount] = useState(0);
    const [toConvertAmount, setToConvertAmount] = useState(100);

    const beforeCurrencyData = currencyData[beforeCurrency];
    const chosenCurrencyData = currencyData[chosenCurrency];

    useEffect(() => {
        const fromCurrency = beforeCurrencyData.symbol;
        fetchExchangeRate({ toConvertAmount, fromCurrency, countrySymbol: chosenCurrencyData.symbol })
            .then((exchangeRate) => {
                setConvertedAmount(exchangeRate);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [beforeCurrencyData.symbol, chosenCurrencyData.symbol, toConvertAmount]);

    const renderCurrencyOptions = (setCurrency: React.Dispatch<React.SetStateAction<keyof typeof currencyData>>) => {
        return Object.entries(currencyData).map(([key, { flag, country }]) => (
            <div key={key}
                className="flex gap-x-2 hover:bg-[#EBEBF52B] rounded-md duration-500 p-3 items-center cursor-pointer"
                onClick={() => { setCurrency(key as keyof typeof currencyData); setModalOpen(false); setModalOpen1(false); }}>
                <Image src={flag} alt={`${country} flag`} />
                <p className="font-medium text-[12px] md:text-[14px] xl:text-[16px]">{country}</p>
            </div>
        ));
    };

    return (
        <main>
            <p className="text-sm lg:text-base text-[#06121B] font-semibold my-14">Convert Amount</p>
            <div className="flex flex-col gap-y-5 2xl:gap-y-0 2xl:flex-row 2xl:justify-between 2xl:items-center">
                <div className="relative min-w-[14rem] 2xl:w-[39%] cursor-pointer">
                    <div className="bg-[#EBEBF52E] p-3 border border-[#7676801F] flex items-center justify-between rounded-lg" onClick={() => setModalOpen1(!modalOpen1)}>
                        <p className="text-xs 2xl:text-sm text-[#B2B3BA]">From:</p>
                        <div className="flex items-center gap-x-1">
                            <Image src={beforeCurrencyData.flag} alt={`${beforeCurrencyData.country} flag`} />
                            <p className="font-medium text-[12px] md:text-[14px] xl:text-[16px]">{beforeCurrencyData.country}</p>
                            <ArrowDown2 size="20" className={`${modalOpen1 && "rotate-180"} duration-200`} />
                        </div>
                    </div>
                    <div className="bg-[#EBEBF52E] p-3 border border-[#7676801F] flex justify-between items-center mt-4 rounded-lg">
                        <div className="w-[80%] flex flex-col gap-y-1">
                            <p className="text-xs 2xl:text-sm text-[#B2B3BA]">You send:</p>
                            <input type="number"
                                value={toConvertAmount}
                                onChange={(e) => setToConvertAmount(Number(e.target.value))}
                                name="convertAmount"
                                id="convertAmount"
                                className="border border-[#E6E7E8] px-2 xl:px-4 py-2 md:py-3 focus:border-primary rounded-md focus:outline-none placeholder:text-xs xl:placeholder:text-sm placeholder:text-[#9EA0A3]"
                            />
                        </div>
                        <p className="text-[10px] md:text-[12px] xl:text-[14px] text-secondary font-semibold">{beforeCurrencyData.symbol}</p>
                    </div>
                    {modalOpen1 && (
                        <div className="bg-white border border-[#7676801F] absolute p-4 w-full top-14 flex flex-col gap-y-1 rounded-lg z-[999999] max-h-[20rem] overflow-y-auto special1">
                            {renderCurrencyOptions(setBeforeCurrency)}
                        </div>
                    )}
                </div>

                <div className="size-10 rounded-[50%] flex items-center justify-center text-[#F2F2F7] bg-secondary mx-auto cursor-pointer border border-secondary hover:text-secondary hover:bg-white duration-500">
                    <ArrowRight3 size="20" className=" -rotate-[30deg] xl:rotate-0" />
                </div>
                <div className="relative min-w-[14rem] 2xl:w-[39%] cursor-pointer">
                    <div className="bg-[#EBEBF52E] p-3 border border-[#7676801F] flex items-center justify-between rounded-lg" onClick={() => setModalOpen(!modalOpen)}>
                        <p className="text-xs 2xl:text-sm text-[#B2B3BA]">To:</p>
                        <div className="flex items-center gap-x-1">
                            <Image src={chosenCurrencyData.flag} alt={`${chosenCurrencyData.country} flag`} />
                            <p className="font-medium text-[12px] md:text-[14px] xl:text-[16px]">{chosenCurrencyData.country}</p>
                            <ArrowDown2 size="20" className={`${modalOpen && "rotate-180"} duration-200`} />
                        </div>
                    </div>
                    <div className="bg-[#EBEBF52E] p-3 border border-[#7676801F] flex justify-between items-center mt-4 rounded-lg">
                        <div className="w-[80%] flex flex-col gap-y-1">
                            <p className="text-xs 2xl:text-sm text-[#B2B3BA]">You receive:</p>
                            <p className="text-sm md:text-base xl:text-lg text-primary font-semibold">{convertedAmount}</p>
                        </div>
                        <p className="text-[10px] md:text-[12px] xl:text-[14px] text-secondary font-semibold">{chosenCurrencyData.symbol}</p>
                    </div>
                    {modalOpen && (
                        <div className="bg-white border border-[#7676801F] absolute p-4 w-full top-14 flex flex-col gap-y-1 rounded-lg z-[999999] max-h-[20rem] overflow-y-auto special1">
                            {renderCurrencyOptions(setChosenCurrency)}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};

export default Convert;
