'use client';

import { useEffect, useState } from 'react';
import LevelsFilter from './RoomsFilter/LevelFilter';
import SearchRoom from './RoomsFilter/SearchRoom';
import TechnologyChip from './RoomsFilter/TechnologyChip';
import TechnologyFilter from './RoomsFilter/TechnologyFilter';
import RoomCard from './RoomCard';
import { Rooms } from '@/rooms-data';

export default function RoomLayout() {
  const [technologies, setTechnologies] = useState([
    { label: 'js', value: 'js' },
    { label: 'react', value: 'react' },
  ]);

  const [levels, setLevels] = useState([
    { label: 'Level 1', value: 'level 1' },
    { label: 'Level 2', value: 'level 2' },
  ]);

  const [selectedLevel, setSelectedLevel] = useState();

  const [selectedTechnologies, setSelectedTechnologies] = useState([]);

  return (
    <div>
      <div className="flex flex-col lg:flex-row justify-center items-center gap-11 my-8">
        <div className="flex items-center justify-center gap-5">
          <TechnologyFilter
            technologies={technologies}
            selectedTechnologies={selectedTechnologies}
            setSelectedTechnologies={setSelectedTechnologies}
          />
          <LevelsFilter levels={levels} setLevels={setSelectedLevel} />
        </div>
        <div>
          <SearchRoom />
        </div>
      </div>

      <div className="flex justify-center mb-8 min-h-[30px]">
        <TechnologyChip
          selectedTechnologies={selectedTechnologies}
          setSelectedTechnologies={setSelectedTechnologies}
        />
      </div>
      <div className="container flex">
        <div className=" rooms grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 m-auto gap-5 pb-5">
          {Rooms.map((room) => {
            return (
              <RoomCard
                roomId={room.id}
                key={room.id}
                owner={room.owner}
                targetRank={room.targetRank}
                description={room.description}
                tags={room.tags}
                participants={room.participants}
                maximumParticipants={room.maximumParticipants}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
