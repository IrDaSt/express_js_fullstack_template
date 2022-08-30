# Minikube explanation why it could not be accessed directly

As minikube is exposing access via nodeIP:nodePort and not on localhost:nodePort, you can get this working by using kubectl's port forwarding capability. For example, if you are running mongodb service:

```
kubectl port-forward svc/mongo 27017:27017
```

This would expose the service on localhost:27017, FWIW. Furthermore, you might want to figure out how to run this in background.

- [source_stack_overflow](https://stackoverflow.com/a/55110218)
