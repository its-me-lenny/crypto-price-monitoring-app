import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { userAuth } from "../context/AuthContext";

const SavedCoin = () => {
  const [coins, setCoins] = useState([]);
  const { user } = userAuth();
  const coinPath = doc(db, "users", `${user?.email}`);

  /**
   * Fetches the users saved watchlist of coins from the Firestore DB
   */
  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "users", `${user?.email}`),
      (doc) => {
        setCoins(doc.data()?.watchList);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [user?.email]);

  /**
   * Saves or deletes the coin in the user's watchlist in the Firestore DB.
   */
  const deleteCoin = async (passedId) => {
    try {
      const result = coins.filter((items) => items.id !== passedId);
      await updateDoc(coinPath, { watchList: result });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      {coins?.length === 0 ? (
        <p>
          You don't have any coins saved. Please save a coin and add it to watch
          list. Click{" "}
          <Link to="/" className="text-accent">
            here
          </Link>{" "}
          to search coins.
        </p>
      ) : (
        <table className="w-full border-collapse text-center">
          <thead>
            <tr className="border-b">
              <th className="px-4">Rank #</th>
              <th className="text-left">Coin</th>
              <th className="text-left">Remove</th>
            </tr>
          </thead>
          <tbody>
            {coins
              .sort((a, b) => a.rank - b.rank)
              .map((coin) => {
                return (
                  <tr key={coin.id} className="h-[60px] overflow-hidden">
                    <td>{coin?.rank}</td>
                    <td>
                      <Link to={`/coin/${coin.id}`}>
                        <div className="flex items-center">
                          <img
                            className="w-8 mr-4 "
                            src={coin?.image}
                            alt={coin?.id}
                          />
                          <div>
                            <p className="hidden sm:table-cell">{coin.name}</p>
                            <p className="text-gray-500 text-left text-sm">
                              {coin?.symbol.toUpperCase()}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </td>
                    <td className="pl-8">
                      <AiOutlineClose
                        onClick={() => deleteCoin(coin.id)}
                        className="cursor-pointer"
                      />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SavedCoin;
