'use client'

import Container from '@/components/Container';
import { DisplayLG, DisplayMD, DisplayXL, TextLG, TextMD, TextXL } from '@/components/Typography';
import { TeamMembersGrid } from '@/components/TeamMembers';
import { ValuesGrid } from '@/components/Values';
import { RecentPosts } from '@/components/RecentPosts';
import JoinUsForm from '@/components/JoinUsForm';
import Image from 'next/image';
import groupImage from '@images/homepage/Image.png';
import p4gImage from '@images/homepage/p4g-vn.jpg';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Header section based on Figma design */}
      <section className="bg-white w-full py-24">
        <Container className="flex flex-col items-center gap-12">
          <div className="flex flex-col items-center gap-6 w-full">
            <div className="flex flex-col gap-3 w-full">
              <DisplayLG
                weight="semibold"
                className="text-center text-[#101828]"
              >
                Global Youth Climate Challenge
              </DisplayLG>
            </div>
            <TextMD className="text-center text-[#475467] max-w-3xl">
              The Global Youth Climate Challenge is a worldwide initiative that empowers young people to take meaningful action against climate change through education, innovation, and community engagement.
            </TextMD>
          </div>
        </Container>
      </section>

      {/* Metrics section based on Figma design */}
      <section className="bg-[#F9FAFB] w-full py-24">
        <Container className="flex flex-row gap-16 items-stretch">
          {/* Image */}
          <div className="flex-1 relative h-[500px]">
            <Image
              src={groupImage}
              alt="Global Youth Climate Challenge group photo"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col gap-16">
            {/* Heading and subheading */}
            <div className="flex flex-col gap-5">
              <TextMD
                weight="semibold"
                className="text-[#1DADDF]"
              >
                Our Progress
              </TextMD>
              <DisplayLG
                weight="semibold"
                className="text-[#101828]"
              >
                Uniting Youth for a Greener Tomorrow
              </DisplayLG>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-8">
              {/* Metric 1 */}
              <div className="flex flex-col gap-3">
                <DisplayXL
                  weight="semibold"
                  className="text-[#1DADDF]"
                >
                  15+
                </DisplayXL>
                <TextLG
                  weight="semibold"
                  className="text-[#101828]"
                >
                  Countries
                </TextLG>
              </div>

              {/* Metric 2 */}
              <div className="flex flex-col gap-3">
                <DisplayXL
                  weight="semibold"
                  className="text-[#1DADDF]"
                >
                  200+
                </DisplayXL>
                <TextLG
                  weight="semibold"
                  className="text-[#101828]"
                >
                  Participants
                </TextLG>
              </div>

              {/* Metric 3 */}
              <div className="flex flex-col gap-3">
                <DisplayXL
                  weight="semibold"
                  className="text-[#1DADDF]"
                >
                  10+
                </DisplayXL>
                <TextLG
                  weight="semibold"
                  className="text-[#101828]"
                >
                  Projects
                </TextLG>
              </div>

              {/* Metric 4 */}
              <div className="flex flex-col gap-3">
                <DisplayXL
                  weight="semibold"
                  className="text-[#1DADDF]"
                >
                  5+
                </DisplayXL>
                <TextLG
                  weight="semibold"
                  className="text-[#101828]"
                >
                  Years Running
                </TextLG>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Team section based on Figma design */}
      <section className="bg-white w-full py-24">
        <Container className="flex flex-col items-center gap-8">
          {/* Heading section */}
          <div className="flex flex-col items-center gap-5 max-w-3xl">
            <div className="flex flex-col gap-3 w-full">
              <TextMD
                weight="semibold"
                className="text-center text-[#1DADDF]"
              >
                Members
              </TextMD>
              <DisplayMD
                weight="semibold"
                className="text-center text-[#101828]"
              >
                Meet our team
              </DisplayMD>
            </div>
            <TextMD className="text-center text-[#475467]">
              We are a team of diverse, passionate youth and foster a culture that empowers youth to do your best work for the sustainable future.
            </TextMD>
          </div>

          {/* Team members grid */}
          <TeamMembersGrid
            members={[
              {
                name: "Dain Kim",
                role: "Leader",
                imageSrc: "/images/team/dain-kim.jpg"
              },
              {
                name: "Brian Chen",
                role: "Tech Team Leader",
                imageSrc: "/images/team/brian-chen.jpg"
              },
              {
                name: "Name",
                role: "Research Team Leader",
                imageSrc: "/images/team/team-member-3.jpg"
              },
              {
                name: "Laehee Park",
                role: "Finance Team Leader",
                imageSrc: "/images/team/laehee-park.jpg"
              },
              {
                name: "Name",
                role: "Outreach Team Leader",
                imageSrc: "/images/team/team-member-5.jpg"
              },
              {
                name: "Name",
                role: "Role description",
                imageSrc: "/images/team/team-member-6.jpg"
              },
              {
                name: "Name",
                role: "Role description",
                imageSrc: "/images/team/team-member-7.jpg"
              },
              {
                name: "Name",
                role: "Role description",
                imageSrc: "/images/team/team-member-8.jpg"
              }
            ]}
          />
        </Container>
      </section>

      {/* Features/Values section based on Figma design */}
      <section className="bg-[#F9FAFB] w-full py-24">
        <Container className="flex flex-col items-center gap-8">
          {/* Heading section */}
          <div className="flex flex-col items-center gap-5 max-w-3xl">
            <div className="flex flex-col gap-3 w-full">
              <TextMD
                weight="semibold"
                className="text-center text-[#1DADDF]"
              >
                Our Values
              </TextMD>
              <DisplayMD
                weight="semibold"
                className="text-center text-[#101828]"
              >
                GYCC is pursuing for...
              </DisplayMD>
            </div>
            <TextMD className="text-center text-[#475467]">
              Our values shape our approach to climate action, emphasizing innovation, collaboration, and youth empowerment to drive meaningful change for a sustainable future.
            </TextMD>
          </div>

          {/* Values grid */}
          <ValuesGrid
            values={[
              {
                title: "Communication",
                description: "We believe in open dialogue and transparent communication to build trust and foster collaboration among youth worldwide.",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22Z" stroke="#344054" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8 10.5H16" stroke="#344054" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8 14H13.5" stroke="#344054" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )
              },
              {
                title: "Action",
                description: "We prioritize tangible action and impactful projects that create real-world solutions to climate challenges at local and global levels.",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 12H18L15 21L9 3L6 12H2" stroke="#344054" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )
              },
              {
                title: "Innovation",
                description: "We encourage creative thinking and innovative approaches to climate challenges, pushing boundaries to find new sustainable solutions.",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22" stroke="#344054" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M16 16L22 22" stroke="#344054" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M22 16L16 22" stroke="#344054" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )
              }
            ]}
          />
        </Container>
      </section>

      {/* Recent Events section based on Figma design */}
      <section className="bg-white w-full py-24">
        <Container className="flex flex-col items-center gap-16">
          {/* Heading section */}
          <div className="flex flex-col items-center gap-5 max-w-3xl">
            <div className="flex flex-col items-center gap-4 w-full">
              <div className="bg-[#E0F4FA] border border-[#B0E2F2] rounded-2xl px-3 py-1">
                <span className="text-[#1DADDF] font-medium text-sm">Recents</span>
              </div>
              <DisplayMD
                weight="semibold"
                className="text-center text-[#101828]"
              >
                P4G Hanoi 2025 Participation 🇻🇳
              </DisplayMD>
            </div>
            <TextMD className="text-center text-[#475467]">
              GYCC delegation recently participated in the P4G (Partnering for Green Growth) Summit in Hanoi, sharing innovative climate solutions developed by youth leaders worldwide.
            </TextMD>
          </div>

          {/* Featured image */}
          <div className="w-full h-[400px] relative rounded-xl overflow-hidden">
            <Image
              src={p4gImage}
              alt="P4G Hanoi 2025 Event"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>

          {/* Posts section */}
          <div className="w-full">
            <div className="flex flex-col gap-8 w-full">
              <TextXL
                weight="semibold"
                className="text-[#101828]"
              >
                Posts
              </TextXL>

              <RecentPosts
                posts={[
                  {
                    title: "P4G Hanoi 2025 Participation 🇻🇳",
                    location: "Hanoi, Vietnam",
                    description: "GYCC attended P4G Hanoi 2025 and presented a policy proposal regarding sustainable development practices for emerging economies, highlighting youth-led initiatives.",
                    date: "April, 2025"
                  },
                  {
                    title: "COP 29 Azerbaijan 2024 Participation 🇦🇿",
                    location: "Baku, Azerbaijan",
                    description: "GYCC representatives participated in panel discussions and workshops at COP 29, sharing insights on youth mobilization strategies.",
                    date: "March, 2025"
                  }
                ]}
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Contact section based on Figma design */}
      <section className="bg-white w-full py-24">
        <Container className="flex flex-col items-center gap-16">
          {/* Heading section */}
          <div className="flex flex-col items-center gap-5 max-w-3xl">
            <div className="flex flex-col gap-3 w-full">
              <TextMD
                weight="semibold"
                className="text-center text-[#1DADDF]"
              >
                Contact us
              </TextMD>
              <DisplayMD
                weight="semibold"
                className="text-center text-[#101828]"
              >
                Partner with us
              </DisplayMD>
            </div>
            <TextMD className="text-center text-[#475467]">
              Hanabank 494-910024-19904 <br />
              글로벌청년기후변화챌린지 Global Youth Climate Challenges
            </TextMD>
          </div>

          {/* Contact form */}
          <JoinUsForm />
        </Container>
      </section>
    </main>
  );
}
