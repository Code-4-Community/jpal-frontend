import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Role from "../api/dtos/role";
import useAuth from "./useAuth";

/**
 * Redirects to /private if not signed in or user is not a researcher.
 */
export default function useRequireResearcher(): void {
  const navigate = useNavigate();
  const [isLoading, , user] = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (!user || user.role !== Role.RESEARCHER) {
        navigate("/private");
      }
    }
  }, [isLoading, user, navigate]);
}