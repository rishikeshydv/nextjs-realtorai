"use client";
import React from "react";
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, FileText, ChevronRight, ArrowUp } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState({
    privacy: "section-1",
    terms: "section-1",
  });

  const scrollToSection = (tab: string, sectionId: string) => {
    setActiveSection((prev) => ({ ...prev, [tab]: sectionId }));
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToTop = (scrollAreaId: string) => {
    const scrollArea = document.getElementById(scrollAreaId);
    if (scrollArea) {
      scrollArea.scrollTop = 0;
    }
  };

  const [userEmail, setUserEmail] = useState<string | null>(null);
  useEffect(() => {
    setUserEmail(localStorage.getItem("email"));
  }, []);
  const navItems = [
    { name: "Home", href: "/" },
    { name: "Insights", href: "/about" },
    { name: "Dashboard", href: `/dashboard/${userEmail}` },
    { name: "Email", href: "/email" },
    { name: "Calendar", href: "/calendar" },
    { name: "Logbook", href: "/logs" },
  ];
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);


  //logout
  const logout = async () => {
    const res = await axios.get("http://localhost:5002/api/v1/logout");
    if (res.data.message === "User Successfully Logged Out.") {
      localStorage.removeItem("email");
      localStorage.removeItem("name");
      setUserEmail(null);
    }
    window.location.href = "/auth/login";
  };
  return (
    <div >
      <div className="w-full py-4 px-6 flex items-center justify-between">
      <Link href="/" className="flex items-center space-x-2">
      <img src="/logo/logo.png" alt="" className="h-auto w-[4em]" />
      </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex space-x-4">
          <ul className="flex gap-6 justify-center">
            {navItems.map((item) => (
              <li key={item.name} className="relative">
                <Link
                  href={item.href}
                  className={cn(
                    "relative flex items-center rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ease-in-out",
                    "hover:bg-gray-100/80 hover:text-gray-900",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                    pathname === item.href
                      ? "bg-[#437A45]/90 text-white shadow-sm hover:bg-[#437A45]"
                      : "bg-gray-50/80 text-gray-700 hover:shadow-sm"
                  )}
                >
                  {item.name}
                  {pathname === item.href && (
                    <span className="absolute bottom-0 left-0 right-0 mx-auto h-0.5 w-4/5 rounded-full bg-white/70" />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop login button */}
        {
        userEmail ? (
          <div className="flex space-x-2 items-center">
          <Link href={`/dashboard/${userEmail}`}>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Link>

          <Button
            asChild
            variant="outline"
            size="sm"
            className="bg-[#437A45] text-white rounded-full p-[1.2em]"
            onClick={logout}
          >
            <div>
              <LogOut />
            </div>
          </Button>
        </div>
        ):(
          <Button variant="outline" className="bg-[#437A45] text-white">
          <Link href="/auth/login">Login</Link>
          </Button>

        )
      }

        {/* Mobile navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="ml-auto">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="flex flex-col gap-4 mt-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    pathname === item.href
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="mt-4 pt-4 border-t">
                <Button asChild className="w-full" size="sm">
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    Login
                  </Link>
                </Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
      <section className="relative py-16 overflow-hidden px-[30%]">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-background/80 pointer-events-none" />

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-muted/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-muted/50 to-transparent" />

        <div className="container relative px-4 md:px-6">
          <div className="flex flex-col items-center space-y-6 text-center max-w-3xl mx-auto">
            <div className="bg-[#8fbc8b] p-3 rounded-full">
              <Shield className="h-6 w-6 text-white" aria-hidden="true" />
            </div>

            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Our Policies
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
                We&apos;re committed to protecting your privacy and data with
                transparent practices and robust security measures.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="pb-16">
      <div className="container mx-auto p-6 max-w-7xl">
        <Card className="border-muted/40 shadow-sm">
          <CardContent className="p-0">
            <Tabs defaultValue="privacy" className="w-full">
              <div className="border-b">
                <TabsList className="w-full h-auto p-0 bg-transparent border-b rounded-none">
                  <TabsTrigger
                    value="privacy"
                    className="flex items-center gap-2 py-4 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
                  >
                    <Shield className="h-4 w-4" />
                    <span>Privacy Policy</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="terms"
                    className="flex items-center gap-2 py-4 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
                  >
                    <FileText className="h-4 w-4" />
                    <span>Terms & Conditions</span>
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Privacy Policy Tab */}
              <TabsContent value="privacy" className="m-0">
                <div className="grid md:grid-cols-[250px_1fr] divide-x">
                  {/* Table of Contents */}
                  <div className="p-4 bg-muted/20 hidden md:block">
                    <h3 className="text-sm font-medium mb-3 text-muted-foreground">
                      On this page
                    </h3>
                    <nav className="space-y-1">
                      {[
                        { id: "section-1", title: "Information We Collect" },
                        {
                          id: "section-2",
                          title: "How We Use Your Information",
                        },
                        {
                          id: "section-3",
                          title: "Disclosure of Your Information",
                        },
                        { id: "section-4", title: "Data Security" },
                        {
                          id: "section-5",
                          title: "Changes to Our Privacy Policy",
                        },
                      ].map((section) => (
                        <Button
                          key={section.id}
                          variant="ghost"
                          size="sm"
                          className={`w-full justify-start text-sm ${
                            activeSection.privacy === section.id
                              ? "bg-muted font-medium"
                              : "font-normal"
                          }`}
                          onClick={() => scrollToSection("privacy", section.id)}
                        >
                          <span className="truncate">{section.title}</span>
                          {activeSection.privacy === section.id && (
                            <ChevronRight className="ml-auto h-4 w-4" />
                          )}
                        </Button>
                      ))}
                    </nav>
                  </div>

                  {/* Content */}
                  <div className="relative">
                    <ScrollArea
                      id="privacy-scroll-area"
                      className="h-[600px] w-full p-6"
                    >
                      <div className="max-w-3xl mx-auto">
                        <div className="flex items-center gap-3 mb-6">
                          <Shield className="h-5 w-5 text-primary" />
                          <h2 className="text-2xl font-bold">Privacy Policy</h2>
                        </div>

                        <div className="bg-muted/20 p-4 rounded-lg mb-6">
                          <p className="text-sm text-muted-foreground">
                            Last updated: {new Date().toLocaleDateString()}
                          </p>
                          <p className="mt-2">
                            At Propfax, we respect your privacy and are
                            committed to protecting it through our compliance
                            with this policy.
                          </p>
                        </div>

                        <section id="section-1" className="mb-8 scroll-mt-6">
                          <h3 className="text-xl font-semibold mb-4 pb-2 border-b">
                            1. Information We Collect
                          </h3>
                          <p className="mb-4 text-muted-foreground">
                            We collect several types of information from and
                            about users of our website, including:
                          </p>
                          <ul className="space-y-2 mb-4">
                            <li className="flex gap-2">
                              <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                              <span>
                                <strong>Personal data:</strong> Name, email
                                address, telephone number, etc.
                              </span>
                            </li>
                            <li className="flex gap-2">
                              <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                              <span>
                                <strong>Usage data:</strong> IP address, browser
                                type, operating system, etc.
                              </span>
                            </li>
                            <li className="flex gap-2">
                              <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                              <span>
                                <strong>
                                  Marketing and communications data:
                                </strong>{" "}
                                Your preferences in receiving marketing from us.
                              </span>
                            </li>
                          </ul>
                        </section>

                        <section id="section-2" className="mb-8 scroll-mt-6">
                          <h3 className="text-xl font-semibold mb-4 pb-2 border-b">
                            2. How We Use Your Information
                          </h3>
                          <p className="mb-4 text-muted-foreground">
                            We use information that we collect about you or that
                            you provide to us, including any personal
                            information:
                          </p>
                          <ul className="space-y-2 mb-4">
                            <li className="flex gap-2">
                              <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                              <span>
                                To present our website and its contents to you.
                              </span>
                            </li>
                            <li className="flex gap-2">
                              <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                              <span>
                                To provide you with information, products, or
                                services that you request from us.
                              </span>
                            </li>
                            <li className="flex gap-2">
                              <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                              <span>
                                To fulfill any other purpose for which you
                                provide it.
                              </span>
                            </li>
                            <li className="flex gap-2">
                              <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                              <span>
                                To carry out our obligations and enforce our
                                rights.
                              </span>
                            </li>
                            <li className="flex gap-2">
                              <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                              <span>
                                To notify you about changes to our website or
                                any products or services we offer or provide
                                though it.
                              </span>
                            </li>
                          </ul>
                        </section>

                        <section id="section-3" className="mb-8 scroll-mt-6">
                          <h3 className="text-xl font-semibold mb-4 pb-2 border-b">
                            3. Disclosure of Your Information
                          </h3>
                          <p className="mb-4 text-muted-foreground">
                            We may disclose aggregated information about our
                            users, and information that does not identify any
                            individual, without restriction. We may disclose
                            personal information that we collect or you provide
                            as described in this privacy policy:
                          </p>
                          <ul className="space-y-2 mb-4">
                            <li className="flex gap-2">
                              <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                              <span>To our subsidiaries and affiliates.</span>
                            </li>
                            <li className="flex gap-2">
                              <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                              <span>
                                To contractors, service providers, and other
                                third parties we use to support our business.
                              </span>
                            </li>
                            <li className="flex gap-2">
                              <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                              <span>
                                To a buyer or other successor in the event of a
                                merger, divestiture, restructuring,
                                reorganization, dissolution, or other sale or
                                transfer of some or all of Propfax&apos;s
                                assets.
                              </span>
                            </li>
                          </ul>
                        </section>

                        <section id="section-4" className="mb-8 scroll-mt-6">
                          <h3 className="text-xl font-semibold mb-4 pb-2 border-b">
                            4. Data Security
                          </h3>
                          <p className="mb-4 text-muted-foreground">
                            We have implemented measures designed to secure your
                            personal information from accidental loss and from
                            unauthorized access, use, alteration, and
                            disclosure.
                          </p>
                        </section>

                        <section id="section-5" className="mb-8 scroll-mt-6">
                          <h3 className="text-xl font-semibold mb-4 pb-2 border-b">
                            5. Changes to Our Privacy Policy
                          </h3>
                          <p className="mb-4 text-muted-foreground">
                            It is our policy to post any changes we make to our
                            privacy policy on this page. If we make material
                            changes to how we treat our users&apos; personal
                            information, we will notify you through a notice on
                            the website home page.
                          </p>
                        </section>
                      </div>
                    </ScrollArea>

                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute bottom-4 right-4 rounded-full shadow-sm"
                      onClick={() => scrollToTop("privacy-scroll-area")}
                    >
                      <ArrowUp className="h-4 w-4" />
                      <span className="sr-only">Scroll to top</span>
                    </Button>
                  </div>
                </div>
              </TabsContent>

              {/* Terms & Conditions Tab */}
              <TabsContent value="terms" className="m-0">
                <div className="grid md:grid-cols-[250px_1fr] divide-x">
                  {/* Table of Contents */}
                  <div className="p-4 bg-muted/20 hidden md:block">
                    <h3 className="text-sm font-medium mb-3 text-muted-foreground">
                      On this page
                    </h3>
                    <nav className="space-y-1">
                      {[
                        {
                          id: "section-1",
                          title: "Interpretation and Definitions",
                        },
                        { id: "section-2", title: "Acknowledgment" },
                        { id: "section-3", title: "User Accounts" },
                        { id: "section-4", title: "Content" },
                        { id: "section-5", title: "Prohibited Uses" },
                        { id: "section-6", title: "Termination" },
                        { id: "section-7", title: "Limitation of Liability" },
                      ].map((section) => (
                        <Button
                          key={section.id}
                          variant="ghost"
                          size="sm"
                          className={`w-full justify-start text-sm ${
                            activeSection.terms === section.id
                              ? "bg-muted font-medium"
                              : "font-normal"
                          }`}
                          onClick={() => scrollToSection("terms", section.id)}
                        >
                          <span className="truncate">{section.title}</span>
                          {activeSection.terms === section.id && (
                            <ChevronRight className="ml-auto h-4 w-4" />
                          )}
                        </Button>
                      ))}
                    </nav>
                  </div>

                  {/* Content */}
                  <div className="relative">
                    <ScrollArea
                      id="terms-scroll-area"
                      className="h-[600px] w-full p-6"
                    >
                      <div className="max-w-3xl mx-auto">
                        <div className="flex items-center gap-3 mb-6">
                          <FileText className="h-5 w-5 text-primary" />
                          <h2 className="text-2xl font-bold">
                            Terms and Conditions
                          </h2>
                        </div>

                        <div className="bg-muted/20 p-4 rounded-lg mb-6">
                          <p className="text-sm text-muted-foreground">
                            Last updated: {new Date().toLocaleDateString()}
                          </p>
                          <p className="mt-2">
                            Please read these terms and conditions carefully
                            before using Our Service.
                          </p>
                        </div>

                        <section id="section-1" className="mb-8 scroll-mt-6">
                          <h3 className="text-xl font-semibold mb-4 pb-2 border-b">
                            1. Interpretation and Definitions
                          </h3>
                          <p className="mb-4 text-muted-foreground">
                            The words of which the initial letter is capitalized
                            have meanings defined under the following
                            conditions. The following definitions shall have the
                            same meaning regardless of whether they appear in
                            singular or in plural.
                          </p>
                        </section>

                        <section id="section-2" className="mb-8 scroll-mt-6">
                          <h3 className="text-xl font-semibold mb-4 pb-2 border-b">
                            2. Acknowledgment
                          </h3>
                          <p className="mb-4 text-muted-foreground">
                            These are the Terms and Conditions governing the use
                            of this Service and the agreement that operates
                            between You and the Company. These Terms and
                            Conditions set out the rights and obligations of all
                            users regarding the use of the Service.
                          </p>
                        </section>

                        <section id="section-3" className="mb-8 scroll-mt-6">
                          <h3 className="text-xl font-semibold mb-4 pb-2 border-b">
                            3. User Accounts
                          </h3>
                          <p className="mb-4 text-muted-foreground">
                            When You create an account with Us, You must provide
                            Us information that is accurate, complete, and
                            current at all times. Failure to do so constitutes a
                            breach of the Terms, which may result in immediate
                            termination of Your account on Our Service.
                          </p>
                        </section>

                        <section id="section-4" className="mb-8 scroll-mt-6">
                          <h3 className="text-xl font-semibold mb-4 pb-2 border-b">
                            4. Content
                          </h3>
                          <p className="mb-4 text-muted-foreground">
                            Our Service allows You to post, link, store, share
                            and otherwise make available certain information,
                            text, graphics, videos, or other material
                            (&apos;Content&apos;). You are responsible for the
                            Content that You post to the Service, including its
                            legality, reliability, and appropriateness.
                          </p>
                        </section>

                        <section id="section-5" className="mb-8 scroll-mt-6">
                          <h3 className="text-xl font-semibold mb-4 pb-2 border-b">
                            5. Prohibited Uses
                          </h3>
                          <p className="mb-4 text-muted-foreground">
                            You may use the Service only for lawful purposes and
                            in accordance with Terms. You agree not to use the
                            Service:
                          </p>
                          <ul className="space-y-2 mb-4">
                            <li className="flex gap-2">
                              <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                              <span>
                                In any way that violates any applicable national
                                or international law or regulation.
                              </span>
                            </li>
                            <li className="flex gap-2">
                              <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                              <span>
                                For the purpose of exploiting, harming, or
                                attempting to exploit or harm minors in any way
                                by exposing them to inappropriate content or
                                otherwise.
                              </span>
                            </li>
                            <li className="flex gap-2">
                              <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                              <span>
                                To transmit, or procure the sending of, any
                                advertising or promotional material, including
                                any &apos;junk mail&apos;, &apos;chain
                                letter,&apos; &apos;spam,&apos; or any other
                                similar solicitation.
                              </span>
                            </li>
                          </ul>
                        </section>

                        <section id="section-6" className="mb-8 scroll-mt-6">
                          <h3 className="text-xl font-semibold mb-4 pb-2 border-b">
                            6. Termination
                          </h3>
                          <p className="mb-4 text-muted-foreground">
                            We may terminate or suspend Your Account
                            immediately, without prior notice or liability, for
                            any reason whatsoever, including without limitation
                            if You breach these Terms and Conditions. Upon
                            termination, Your right to use the Service will
                            cease immediately.
                          </p>
                        </section>

                        <section id="section-7" className="mb-8 scroll-mt-6">
                          <h3 className="text-xl font-semibold mb-4 pb-2 border-b">
                            7. Limitation of Liability
                          </h3>
                          <p className="mb-4 text-muted-foreground">
                            To the maximum extent permitted by applicable law,
                            in no event shall the Company or its suppliers be
                            liable for any special, incidental, indirect, or
                            consequential damages whatsoever (including, but not
                            limited to, damages for loss of profits, loss of
                            data or other information, for business
                            interruption, for personal injury, loss of privacy
                            arising out of or in any way related to the use of
                            or inability to use the Service, third-party
                            software and/or third-party hardware used with the
                            Service, or otherwise in connection with any
                            provision of this Terms), even if the Company or any
                            supplier has been advised of the possibility of such
                            damages and even if the remedy fails of its
                            essential purpose.
                          </p>
                        </section>
                      </div>
                    </ScrollArea>

                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute bottom-4 right-4 rounded-full shadow-sm"
                      onClick={() => scrollToTop("terms-scroll-area")}
                    >
                      <ArrowUp className="h-4 w-4" />
                      <span className="sr-only">Scroll to top</span>
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      </section>
    </div>
  );
}
