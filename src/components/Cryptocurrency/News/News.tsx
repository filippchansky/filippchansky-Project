"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { INews } from "../../../../models/newsData";
import { Collapse, Pagination, PaginationProps, Skeleton, Spin } from "antd";
import NewsDescription from "./NewsDescription/NewsDescription";
import NewsTitle from "./NewsTitle/NewsTitle";
import style from "./style.module.scss";

interface NewsProps {
  TOKEN: string;
}

const News: React.FC<NewsProps> = ({ TOKEN }) => {
  const fetchNews = async (type: string, page: number, limit: number) => {
    const { data } = await axios.get(
      `https://openapiv1.coinstats.app/news/type/${type}?page=${page}&limit=${limit}`,
      {
        headers: {
          "X-API-KEY": TOKEN,
        },
      }
    );
    setNews(data);
    setFetching(false);
    return data;
  };
  const [news, setNews] = useState<INews>();
  const [totalPage, setTotalPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [newsType, setNewsType] = useState("latest");
  const [fetching, setFetching] = useState(false);
  const { data, isLoading, isError } = useQuery<INews>({
    queryKey: ["news", newsType, currentPage, limit],
    queryFn: () => fetchNews(newsType, currentPage, limit),
  });
  useEffect(() => {
    if (fetching) {
      setLimit(limit + 10);
    }
  }, [fetching]);

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);

    return () => {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  const scrollHandler = (e: any) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      100
    ) {
      setFetching(true);
    }
  };

  return (
    <div className="text-start flex flex-col gap-5">
      {news
        ? news?.map((item) => (
            <Collapse
              key={item.id}
              items={[
                {
                  key: item.id,
                  label: <NewsTitle item={item} />,
                  children: <NewsDescription item={item} />,
                },
              ]}
            />
          ))
        : Array.from({ length: 10 }).map((item, index) => (
            <div key={index} className="flex items-center max-h-[100px] w-full">
              <Skeleton.Input
                active
                size="large"
                className={style.skeleton}
                style={{ height: "70px" }}
              />
            </div>
          ))}
      {fetching && <Spin />}
    </div>
  );
};
export default News;
