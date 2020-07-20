// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps;

import java.util.Collection;
import java.util.*;

public final class FindMeetingQuery {
    public Collection<TimeRange> query(Collection<Event> events, MeetingRequest request) {
        
        Collection<TimeRange> ans= new ArrayList<TimeRange>();

        // if(request.getDuration()>1440)return ans;

        // if(events.isEmpty()||request.getAttendees().isEmpty())
        // {
        //     ans.add(TimeRange.fromStartDuration(0,1440));
        //     return ans;
        // }

        //create an array to mark the unavailable time;
        int[] temp=new int[1441];

        for(Event event:events)
        {
            Set<String> attendees=event.getAttendees();

            //traverse on each event and find if the attendees of the required meeting
            //has to attend any other meeting.
            for(String attendee:request.getAttendees())
            {
                //if any attendee of the required meeting is preoccupied,
                //mark the time slot of that event as unavailable
                if(attendees.contains(attendee))
                {
                    for(int i=event.getWhen().start();i<event.getWhen().start()+event.getWhen().duration();i++)
                    {
                        temp[i]=1;//temp[i]=1 signifies ith time is unavailable
                    }
                    break;
                }
            }
        }

        int duration=(int)request.getDuration(),st=-1;

        //add the available time slots to answer.
        for(int i=0;i<=1440;i++)
        {
            if(temp[i]==1)
            {
                if(st!=-1&&i-st>=duration)
                {
                    ans.add(TimeRange.fromStartDuration(st,i-st));
                }
                st=-1;
            }
            else if(st==-1)st=i;
        }
        if(st!=-1&&1440-st>=duration)
        {
            ans.add(TimeRange.fromStartDuration(st,1440-st));
        }

        return ans;
    }
}
