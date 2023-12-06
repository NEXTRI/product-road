"use client";
import { css } from "@/styled-system/css";
import { flex, vstack } from "@/styled-system/patterns";
import { X } from "lucide-react";
import { ToggleButton } from "./ToggleButton";
import { sideBarItem } from "@/lib/types";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

type props = {
  openDrawer: boolean;
  onSetOpenDrawer: (value: boolean) => void;
  topics: Array<sideBarItem> | undefined;
};

export default function NewIdea({
  openDrawer,
  onSetOpenDrawer,
  topics,
}: props) {
  const supabase = createClient();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [topicSelected, setTopicSelected] = useState("");
  const [isPrivte, setIsPrivate] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function clearData() {
    setTitle("");
    setDescription("");
    setIsPrivate(false);
    setTopicSelected("");
    setErrorMessage("");
  }

  async function addNewIdea() {
    if (title != "" && topicSelected != "") {
      const { data, error } = await supabase
        .from("ideas")
        .insert([
          {
            title: title,
            description: description,
            is_private: isPrivte,
            topic_id: topicSelected,
          },
        ])
        .select();
      if (data) {
        clearData();
        onSetOpenDrawer(false);
      }

      if (error) {
        setErrorMessage(error.message);
      }
    } else {
      if (title == "") {
        setErrorMessage("Please complete the title field.");
      } else if (!topicSelected) {
        setErrorMessage("Please select one topic.");
      } else {
        setErrorMessage("");
      }
    }
  }

  return (
    <div
      className={css({
        transitionDelay: "1s",
        display: openDrawer ? "block" : "none",
        transition: "all",
      })}
    >
      <div
        className={css({
          bg: "rgba(0,0,0,0.5)",
          w: "full",
          h: "screen",
          position: "absolute",
          top: 0,
          right: 0,
          zIndex: 15,
        })}
        onClick={() => onSetOpenDrawer(false)}
      ></div>
      <div
        className={css({
          display: "flex",
          flexDirection: "column",
          bg: "white",
          w: openDrawer ? "50%" : 0,
          h: "screen",
          position: "absolute",
          top: 0,
          right: openDrawer ? 0 : -6000,
          opacity: openDrawer ? 1 : 0,
          zIndex: 15,
          p: 5,
          transitionDuration: "1.5s",
          transition: "width ease-in",
          overflowY: "auto",
        })}
      >
        <button
          className={css({ color: "gray.400", ms: "auto", cursor: "pointer" })}
          onClick={() => onSetOpenDrawer(false)}
        >
          <X size={24} />
        </button>
        <div
          className={vstack({
            py: 3,
            px: 5,
            alignItems: "flex-start",
          })}
        >
          <h3
            className={css({
              fontSize: "2xl",
              fontWeight: "bold",
              mb: 5,
            })}
          >
            Tell us your Idea!
          </h3>
          <div
            className={vstack({
              gap: "25px",
              alignItems: "flex-start",
              w: "full",
            })}
          >
            {errorMessage && (
              <div
                className={css({
                  p: 3,
                  fontSize: "small",
                  backgroundColor: "red.300",
                  border: "1px solid",
                  borderColor: "red.400!important",
                  color: "red.900",
                  w: "full",
                })}
              >
                {errorMessage}
              </div>
            )}
            <input
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={css({
                w: "full",
                p: 3,
                boxShadow: "basic",
                borderRadius: "md",
                outlineColor: "sky.200",
              })}
              placeholder="Title..."
            />
            <textarea
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={css({
                w: "full",
                p: 3,
                boxShadow: "basic",
                borderRadius: "md",
                outlineColor: "sky.200",
              })}
              rows={5}
              placeholder="Description..."
            ></textarea>
            <div>
              <h4 className={css({ fontWeight: "semibold" })}>Topics</h4>
              <div className={flex({ gap: 3, wrap: "wrap" })}>
                {topics?.map((topic) => (
                  <button
                    className={css({
                      cursor: "pointer",
                      bg: topicSelected == topic.id ? "sky.200" : "white",
                      py: 2,
                      px: 3,
                      boxShadow: "basic",
                      borderRadius: "md",
                      transition: "0.3s",
                      _hover: {
                        bg: topicSelected == topic.id ? "sky.200" : "gray.100",
                      },
                    })}
                    onClick={() => setTopicSelected(topic.id)}
                  >
                    {topic.name}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4 className={css({ fontWeight: "semibold" })}>Private</h4>
              <ToggleButton isPrivate={isPrivte} onSetIsPrivte={setIsPrivate} />
            </div>
          </div>
          <button
            className={css({
              alignSelf: "end",
              cursor: "pointer",
              py: 2,
              px: 7,
              mt: 5,
              boxShadow: "basic",
              borderRadius: "md",
              transition: "0.3s",
              bg: "rose.500",
              color: "white",
              _hover: {
                bg: "rose.600",
              },
            })}
            onClick={addNewIdea}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
