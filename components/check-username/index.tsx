import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useDebounce } from "@/hooks/useDebounce";
import { Input } from "../ui/input";
import { Spinner } from "../spinner";
import { CheckCircle, XCircle } from "lucide-react";
import { BASE_URL } from "@/lib/base-url";
import { generateBaseUsername } from "@/lib/helper";

const CheckUsername = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isAvailable, setIsAvailable] = React.useState<boolean | null>(null);
  const [suggestions, setSuggestions] = React.useState<string[]>([]);
  const { register, watch, setError, setValue, clearErrors } = useFormContext();
  const username = watch("username");

  const deboucedUsername = useDebounce(username, 500);

  useEffect(() => {
    if (deboucedUsername) {
      checkUsernameAvailablity(deboucedUsername);
    }
  }, [deboucedUsername]);

  const checkUsernameAvailablity = async (username: string) => {
    console.log(username, "user");

    try {
      setIsLoading(true);
      const response = await fetch(
        `${BASE_URL}/api/check-username?username=${username}`
      );
      const data = await response.json();
      setIsAvailable(data.isAvailable);
      setSuggestions([]);
      clearErrors("username");
      if (!data.isAvailable) {
        // Generate 4 alternative usernames based on fullName
        const generatedSuggestions = Array(4)
          .fill(null)
          .map(() => generateBaseUsername(username));
        setSuggestions(generatedSuggestions);
        setError("username", { message: "Username is already taken" });
      }
    } catch (error) {
      console.log(error);
      setError("username", { message: "Error checking username" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setValue("username", suggestion);
    clearErrors("username");
  };
  return (
    <div className="w-full relative">
      <Input
        placeholder="Enter username"
        disabled={isLoading}
        className="form--input focus:boder-0
                   dark:border-[rgba(255,255,255,.5)]"
        {...register("username")}
      />
      {/* Loader and validation icons */}
      <div className="absolute right-3 top-2">
        {isLoading ? (
          <Spinner className="text-gray-600 !size-[20px]" />
        ) : isAvailable === true ? (
          <CheckCircle className="text-green-500" size={20} />
        ) : isAvailable === false ? (
          <XCircle className="text-red-500" size={20} />
        ) : null}
      </div>
      {/* Suggested usernames */}
      {isAvailable === false && suggestions.length > 0 && (
        <div className="mt-2 text-sm">
          <p className="mb-1">Suggestions</p>
          <ul
            className="flex flex-row gap-3 flex-wrap ml-[1px]
          text-base text-primary"
          >
            {suggestions?.map((suggestion) => (
              <li
                role="button"
                key={suggestion}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CheckUsername;
