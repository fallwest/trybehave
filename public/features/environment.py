
def before_all(context):
    context._runner.step_registry.steps["given"] = []
    context._runner.step_registry.steps["when"] = []
    context._runner.step_registry.steps["then"] = []
    context._runner.step_registry.steps["step"] = []
    context._runner.load_step_definitions()
