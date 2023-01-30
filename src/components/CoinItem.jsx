import React, { useState, useEffect } from "react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { userAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { arrayUnion, doc, updateDoc, onSnapshot } from "firebase/firestore";

const CoinItem = ({ coin }) => {
  const [savedCoin, setSavedCoin] = useState(false);
  const { user } = userAuth();
  const coinPath = doc(db, "users", `${user?.email}`);

  const saveCoin = async () => {
    if (user?.email) {
      setSavedCoin(true);
      await updateDoc(coinPath, {
        watchList: arrayUnion({
          id: coin.id,
          name: coin.name,
          image: coin.image,
          rank: coin.market_cap_rank,
          symbol: coin.symbol,
        }),
      });
    } else {
      alert("Please sign in to save a coin to your watch list");
    }
  };

  const isStarred = (watchList) => {
    const filteredCoinList = watchList.filter((token) => {
      return token.id === coin.id;
    });

    if (filteredCoinList.length !== 0) {
      setSavedCoin(true);
    } else {
      setSavedCoin(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "users", `${user?.email}`),
      (doc) => {
        if (doc.exists) {
          const watchList = doc.data()?.watchList;
          console.log("uno");
          isStarred(watchList);
        }
      },
      (error) => {
        if (error.code === "permission-denied") {
          {
            /* The user needs to log in first.*/
            isStarred([]);
          }
          return;
        } else {
          throw new Error(error);
        }
      }
    );

    return () => {
      unsubscribe();
    };
  }, [user?.email]);

  return (
    <tr className="h-[80px] border-b overflow-hidden">
      <td onClick={saveCoin} className="cursor-pointer">
        {savedCoin ? <AiFillStar /> : <AiOutlineStar />}
      </td>
      <td>{coin.market_cap_rank}</td>
      <td>
        <Link to={`/coin/${coin.id}`}>
          <div className="flex items-center">
            <img
              className="w-6 mr-2 rounded-full"
              src={coin.image}
              alt={coin.id}
            />
            <p className="hidden sm:table-cell">{coin.name}</p>
          </div>
        </Link>
      </td>
      <td>{coin.symbol.toUpperCase()}</td>
      <td>${coin.current_price.toLocaleString()}</td>
      <td>
        {coin.price_change_percentage_24h > 0 ? (
          <p className="text-green-600">
            {coin.price_change_percentage_24h.toFixed(2)}%
          </p>
        ) : (
          <p className="text-red-600">
            {coin.price_change_percentage_24h.toFixed(2)}%
          </p>
        )}
      </td>
      <td className="w-[180px] hidden md:table-cell">
        ${coin.total_volume.toLocaleString()}
      </td>
      <td className="w-[180px] hidden sm:table-cell">
        ${coin.market_cap.toLocaleString()}
      </td>
      <td>
        <Sparklines data={coin.sparkline_in_7d.price}>
          <SparklinesLine color="teal" />
        </Sparklines>
      </td>
    </tr>
  );
};

export default CoinItem;
