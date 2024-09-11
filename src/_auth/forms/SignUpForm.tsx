import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignUpValidation } from "@/lib/validation";
import Loader from "@/components/shared/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useCreateAccount } from "@/lib/react-query/queries";
import { useToast } from "@/hooks/use-toast";
import { signInAccount } from "@/lib/appwrite/api";
import { useUserContext } from "@/context/AuthContext";

const SignUpForm = () => {
  const { toast } = useToast();
  const { checkAuthUser, isLoading } = useUserContext();
  const navigate = useNavigate();
  const { mutateAsync: createAccount, isPending } = useCreateAccount();

  const onSubmit = async (values: z.infer<typeof SignUpValidation>) => {
    const newUser = await createAccount(values);

    if (!newUser) return toast({ title: "Sign Up failed. Please try again." });

    const session = await signInAccount({
      email: values.email,
      password: values.password,
    });

    if (!session)
      return toast({
        title: "Sign in failed. Please try again.",
        variant: "destructive",
      });

    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      form.reset();
      navigate("/");
    } else {
      toast({ title: "Sign up failed. Please try again" });
    }
  };

  const form = useForm<z.infer<typeof SignUpValidation>>({
    resolver: zodResolver(SignUpValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  return (
    <Form {...form}>
      {/* for smaller device */}
      <div className="sm:w-420 flex-center flex-col">
        <img src="/assets/images/logo.svg" alt="logo" />

        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Create a new account
        </h2>

        <p className="text-light-3 small-medium md:base-regular mt-2">
          To use Snapgram enter your details
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full mt-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="shad-button_primary"
            disabled={isPending}
          >
            {isPending ? (
              <div className="flex-center gap-2">
                <Loader />
                Loading...
              </div>
            ) : (
              "Sign Up"
            )}
          </Button>

          <p className="text-small-regular text-light-2 text-center">
            Already have an account ?{" "}
            <Link className="text-primary-500  ml-1" to="/sign-in">
              Login
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SignUpForm;
