import * as React from "react";
import { IProjectDetailProps } from "../IProjectDetailProps";
import { Button } from "../UI/Button";

export const Activities: React.FC<IProjectDetailProps> = ({
  filteredActivities,
  deleteTask,
}) => {
  const activities = filteredActivities;
  return (
    <>
      {activities.length < 1 ? (
        <p className="text-gray-800 my-4">
          This project does not have any tasks yet...
        </p>
      ) : (
        <table className="w-full p-4 mt-8 rounded-md bg-gray-100">
          <thead>
            <tr>
              <th className="text-gray-600 whitespace-pre-wrap my-1">Title</th>
              <th className="text-gray-600 whitespace-pre-wrap my-1">
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            {activities.map((task: any) => (
              <tr key={task.id}>
                <td
                  className="text-gray-600 whitespace-pre-wrap mt-1"
                  style={{ verticalAlign: "top" }} // Aligns content to the top
                >
                  {task.title}
                </td>
                <td
                  className="text-gray-600 whitespace-pre-wrap mt-1"
                  style={{ verticalAlign: "top" }}
                >
                  {task.description}
                </td>
                <td className="text-gray-600 whitespace-pre-wrap mt-1">
                  <Button
                    onClick={() => deleteTask(task.id)}
                    className="px-4 py-2 mb-4 text-xs md:text-base border-none bg-gray-700 text-gray-200 hover:bg-red-800 hover:text-gray-100"
                  >
                    Clear
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
