
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Target, Plus, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface Goal {
  id: string;
  title: string;
  target: number;
  current: number;
  deadline: string;
}

export const SustainabilityGoals = () => {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: "1",
      title: "Reduce Transport Emissions",
      target: 30,
      current: 18,
      deadline: "2024-12-31"
    },
    {
      id: "2",
      title: "Switch to Renewable Energy",
      target: 50,
      current: 35,
      deadline: "2025-06-30"
    }
  ]);

  const [newGoal, setNewGoal] = useState({
    title: "",
    target: "",
    deadline: ""
  });

  const addGoal = () => {
    if (!newGoal.title || !newGoal.target || !newGoal.deadline) {
      toast.error("Please fill in all fields");
      return;
    }

    const goal: Goal = {
      id: Date.now().toString(),
      title: newGoal.title,
      target: Number(newGoal.target),
      current: 0,
      deadline: newGoal.deadline
    };

    setGoals([...goals, goal]);
    setNewGoal({ title: "", target: "", deadline: "" });
    toast.success("Goal added successfully!");
  };

  const updateProgress = (id: string, progress: number) => {
    setGoals(goals.map(goal => 
      goal.id === id ? { ...goal, current: Math.min(progress, goal.target) } : goal
    ));
    toast.success("Progress updated!");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-green-600" />
            Add New Goal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="goal-title">Goal Title</Label>
              <Input
                id="goal-title"
                value={newGoal.title}
                onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                placeholder="e.g., Reduce packaging waste"
              />
            </div>
            <div>
              <Label htmlFor="goal-target">Target Reduction (%)</Label>
              <Input
                id="goal-target"
                type="number"
                value={newGoal.target}
                onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
                placeholder="25"
              />
            </div>
            <div>
              <Label htmlFor="goal-deadline">Deadline</Label>
              <Input
                id="goal-deadline"
                type="date"
                value={newGoal.deadline}
                onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
              />
            </div>
          </div>
          <Button onClick={addGoal} className="mt-4">
            <Plus className="mr-2 h-4 w-4" />
            Add Goal
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {goals.map((goal) => {
          const progressPercentage = (goal.current / goal.target) * 100;
          const isCompleted = goal.current >= goal.target;
          
          return (
            <Card key={goal.id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{goal.title}</span>
                  {isCompleted && <CheckCircle className="h-5 w-5 text-green-600" />}
                </CardTitle>
                <CardDescription>
                  Target: {goal.target}% by {new Date(goal.deadline).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Progress</span>
                    <span className="text-sm font-medium">{goal.current}% / {goal.target}%</span>
                  </div>
                  <Progress value={progressPercentage} className="h-3" />
                </div>
                
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="Update progress"
                    className="flex-1"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        const value = Number((e.target as HTMLInputElement).value);
                        updateProgress(goal.id, value);
                        (e.target as HTMLInputElement).value = '';
                      }
                    }}
                  />
                  <Button
                    variant="outline"
                    onClick={(e) => {
                      const input = e.currentTarget.parentElement?.querySelector('input');
                      if (input) {
                        updateProgress(goal.id, Number(input.value));
                        input.value = '';
                      }
                    }}
                  >
                    Update
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
