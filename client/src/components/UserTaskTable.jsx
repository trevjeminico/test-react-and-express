import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router";

export default function UserTaskTable({ data }) {
  const statusBgColor = {
    5000: "#C04C31",
    5001: "#F2C572",
    5002: "#81A489",
    5003: "#3597DC",
  };
  return (
    <div className="ml-25 mr-25 mt-5 mb-5 flex justify-cente">
      <section className="bg-white rounded-lg p-6 shadow-md space-y-6 w-full content-center  justify-center">
        <div className="flex justify-end items-end border-b dark:border-gray-200">
          <div className="text-[13px] my-2 mx-2">In-review: </div>
          <div className="h-5 w-5 border dark:border-gray-500 py-2 px-2 my-2 mr-2 bg-[#C04C31]"></div>
          <div className="text-[13px] my-2 mx-2">Ready to work: </div>
          <div className="h-5 w-5 border dark:border-gray-500 py-2 px-2 my-2 mr-2  bg-[#F2C572]"></div>
          <div className="text-[13px] my-2 mx-2">In-progress: </div>
          <div className="h-5 w-5 border dark:border-gray-500 py-2 px-2 my-2 mr-2  bg-[#81A489]"></div>
          <div className="text-[13px] my-2 mx-2">Done: </div>
          <div className="h-5 w-5 border dark:border-gray-500 py-2 px-2 my-2 mr-2  bg-[#3597DC]"></div>
        </div>
        {data?.length > 0 ? (
          <div className="h-105 overflow-auto">
            <table className="w-full my-0 align-middle border-neutral-200">
              <thead className="align-bottom">
                <tr className="text-[0.95rem] text-gray-400 ">
                  <th className="pb-3 text-start min-w-[175px]">Task</th>
                  <th className="pb-3 text-end min-w-[175px]">date created</th>
                  <th className="pb-3 pr-12 text-end min-w-[175px]">Status</th>
                </tr>
              </thead>
              <tbody className="">
                {data.map((d, i) => {
                  return (
                    <tr
                      className="border-b dark:border-b-gray-200 last:border-b-0"
                      key={i}
                    >
                      <td className="p-2 pl-0">
                        <a
                          href={`/task/edit/${d._id}`}
                          className="mb-1 transition-colors duration-200 ease-in-out text-lg/normal text-secondary-inverse hover:text-primary"
                        >
                          {d.title}
                        </a>
                      </td>
                      <td className="pr-0 text-end">
                        <span className=" text-light-inverse text-md/normal">
                          {new Date(d.createdAt).toISOString().split("T")[0]}
                        </span>
                      </td>
                      <td className="p-2 pr-12 text-end">
                        <span className="text-center align-baseline inline-flex px-4 py-3 mr-auto items-center text-[.95rem] leading-none text-primary bg-primary-light rounded-lg">
                          <div
                            className={`h-5 w-5 border dark:border-gray-500 py-2 px-2 my-2 mr-2 bg-[${
                              statusBgColor[d.statusCode]
                            }]`}
                          ></div>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center">no records</div>
        )}
      </section>
    </div>
  );
}

UserTaskTable.PropTypes = {
  data: PropTypes.object,
};
