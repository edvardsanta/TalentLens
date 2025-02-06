import React from "react";
import styles from "./loading.module.scss";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const LoadingFallback = () => {
  return (
    <div className={styles.container}>
      <div className="w-75">
        <Skeleton height={20} count={1} />
        <div className="mt-2">
          <Skeleton height={15} count={3} />
        </div>
        <div className="mt-4">
          <Skeleton height={40} count={1} />
        </div>
      </div>
    </div>
  );
};
export default LoadingFallback;
