"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { guideSort } from "@/app/constant/constant";
import { getAllBooking } from "@/app/libs/bookingApi";
import {
  Card,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
} from "@material-tailwind/react";
import {
  HiOutlinePencil as PencilIcon,
  HiOutlineUserAdd as UserPlusIcon,
  HiOutlineSearch as MagnifyingGlassIcon,
  HiOutlineChevronDown as ChevronUpDownIcon,
} from "react-icons/hi";
import { bookingTableHead, bookingTabs } from "@/app/constant/constant";
import Loading from "@/app/ui/Loading";
import DateManager from "@/app/util/DateManager";

export default function AllBooking() {
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(false);
  const [acitveSort, setActiveSort] = useState(null);
  const [searchQuery, setSearchQuery] = useState(null);
  const [pageInfo, setPageInfo] = useState(null);
  const [page, setPage] = useState(pageInfo?.currentPage || 1);

  const manageData = new DateManager();
  const handleActiveSort = (sortValue) => {
    setActiveSort(sortValue);
  };

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const res = await getAllBooking(searchQuery, acitveSort, page);
        setBooking(res?.data?.tour);
        setPageInfo(res?.pagination);
      } catch (error) {
        setLoading(false);
      }
      setLoading(false);
    };
    getData();
  }, [searchQuery, acitveSort, page]);

  const nextPage = () => setPage(pageInfo?.currentPage + 1);
  const prevPage = () => setPage(pageInfo?.currentPage - 1);

  console.log(pageInfo);

  return (
    <>
      <Card className="maxhfu w-full my-2">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row p-6">
          <Tabs value="all" className="w-full md:w-max">
            <TabsHeader>
              {bookingTabs.map(({ label, value }, index) => (
                <Tab
                  key={value}
                  value={value}
                  onClick={(e) =>
                    handleActiveSort(value !== "all" ? value : "")
                  }
                >
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
          <div className="w-full md:w-72">
            <Input
              onChange={(e) => {
                setTimeout(() => {
                  setSearchQuery(e.target?.value);
                }, 800);
              }}
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>
        </div>
        <CardBody className="overflow-auto px-0">
          {loading && (
            <div className=" h-[400px]">
              <Loading />
            </div>
          )}
          {!loading && booking?.length < 1 && (
            <div className=" p-6">
              <Typography className="  text-offGray text-lg text-center">
                No booking data found
              </Typography>
            </div>
          )}

          {!loading && booking?.length > 0 && (
            <table className="mt-4 w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {bookingTableHead.map((head, index) => (
                    <th
                      key={head}
                      className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                      >
                        {head}{" "}
                        {index !== bookingTableHead.length - 1 && (
                          <ChevronUpDownIcon
                            strokeWidth={2}
                            className="h-4 w-4"
                          />
                        )}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {booking?.map((item, index) => {
                  const isLast = index === booking.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={item?.id}>
                      <td className={classes}>
                        <Link href={`/profile/${item?.user?.userName}`}>
                          <div className="flex items-center gap-3 hover:opacity-80 duration-300">
                            <Avatar
                              src={item?.user?.profileImage}
                              alt={item?.user?.userName}
                              size="md"
                            />
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {item?.user?.fullName}
                              </Typography>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal opacity-70"
                              >
                                {item?.user?.userName}
                              </Typography>
                            </div>
                          </div>
                        </Link>
                      </td>
                      <td className={classes}>
                        <Link href={`/tour/${item?.tour?.id}`}>
                          <div className="flex items-center gap-3  max-w-[250px hover:opacity-80 duration-300 ">
                            <Avatar
                              src={item?.tour?.coverImage}
                              alt={"tour-cover-image"}
                              variant="rounded"
                              size="md"
                            />
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal max-w-[200px] overflow-hidden whitespace-nowrap text-ellipsis "
                              >
                                {item?.tour?.title}
                              </Typography>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal opacity-70"
                              >
                                ${item?.tour?.price}
                              </Typography>
                            </div>
                          </div>
                        </Link>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="green"
                            className="font-medium tracking-wider"
                          >
                            ${item?.price}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <Link href={`/profile/${item?.guide?.userName}`}>
                          <div className="flex items-center gap-3 hover:opacity-80 duration-300">
                            <Avatar
                              src={item?.guide?.profileImage}
                              alt={item?.guide?.userName}
                              size="md"
                            />
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {item?.guide?.fullName}
                              </Typography>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal opacity-70"
                              >
                                ${item?.guide?.price} per/person
                              </Typography>
                            </div>
                          </div>
                        </Link>
                      </td>
                      <td className={classes}>
                        <div className="w-max">
                          <Chip
                            size="md"
                            variant="gradient"
                            value={item?.isComplete ? "Complete" : "Upcoming"}
                            color={item?.isComplete ? "green" : "orange"}
                            className=" tracking-wider font-medium"
                          />
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {manageData.getDaysLeft(item?.createdAt).dateFormat}
                        </Typography>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </CardBody>
      </Card>
      <div className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          {`Page ${pageInfo?.currentPage || 1} of ${pageInfo?.totalPage || 1}`}
        </Typography>
        <div className="flex gap-2">
          <Button
            onClick={prevPage}
            disabled={pageInfo?.currentPage === 1}
            variant="outlined"
            size="sm"
          >
            Previous
          </Button>
          <Button
            onClick={nextPage}
            disabled={pageInfo?.currentPage >= pageInfo?.totalPage}
            variant="outlined"
            size="sm"
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
}
